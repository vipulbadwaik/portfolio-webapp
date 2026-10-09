import { NextResponse } from 'next/server';

const RESEND_URL = 'https://api.resend.com/emails';
const TO = process.env.CONTACT_TO_EMAIL || 'vipul.badwaik@gmail.com';
const FROM = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, message: 5000 };

// Best-effort per-instance rate limit (resets on cold start / differs per instance).
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

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

const escapeHtml = (str) =>
  str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please fill in all fields.' }, { status: 400 });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ error: 'One of the fields is too long.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  try {
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `New portfolio message from ${name.replace(/[\r\n]+/g, ' ')}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!res.ok) {
      console.error('Resend error', res.status, await res.text());
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Resend request failed', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 502 });
  }
}
