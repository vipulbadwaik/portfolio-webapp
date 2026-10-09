import { SITE_URL } from '../lib/site';

// AI crawlers are listed explicitly (same access as "*") so the intent is visible and easy to change.
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'Claude-SearchBot',
  'Google-Extended',
  'PerplexityBot',
  'CCBot',
  'Bytespider',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
