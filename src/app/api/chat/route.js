import { buildSystemPrompt } from '../../../lib/knowledge';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODELS = [
  process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
  process.env.GROQ_FALLBACK_MODEL || 'openai/gpt-oss-20b',
];

const MAX_MESSAGES = 10;
const MAX_CHARS = 600;

// Best-effort per-instance rate limit (resets on cold start / differs per instance).
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 25;

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_HITS;
}

const json = (body, status) => Response.json(body, { status });

async function callGroq(apiKey, model, messages) {
  return fetch(GROQ_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      temperature: 0.3,
      max_tokens: 500,
      reasoning_effort: 'low',
    }),
  });
}

/** Turn Groq's SSE stream into a plain text stream of content deltas. */
function toTextStream(upstream) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';

  return new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop();
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const data = line.slice(5).trim();
            if (!data || data === '[DONE]') continue;
            try {
              const delta = JSON.parse(data).choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              /* ignore malformed chunk */
            }
          }
        }
      } catch (err) {
        console.error('chat stream error', err);
      } finally {
        controller.close();
      }
    },
  });
}

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY is not set');
    return json({ error: 'Chat is not configured.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const history = incoming
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content)
    .slice(-MAX_MESSAGES);

  if (history.length === 0 || history[history.length - 1].role !== 'user') {
    return json({ error: 'Please send a message.' }, 400);
  }

  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) {
    return json({ error: 'Too many messages. Please try again in a few minutes.' }, 429);
  }

  const messages = [{ role: 'system', content: buildSystemPrompt() }, ...history];

  for (const model of MODELS) {
    try {
      const res = await callGroq(apiKey, model, messages);
      if (res.ok && res.body) {
        return new Response(toTextStream(res.body), {
          headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
        });
      }
      console.error('Groq error', model, res.status, await res.text());
    } catch (err) {
      console.error('Groq request failed', model, err);
    }
  }

  return json({ error: 'The assistant is unavailable right now.' }, 502);
}
