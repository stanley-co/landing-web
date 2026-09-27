/* global process, fetch, URL */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const port = Number(process.env.PORT ?? 80);
const apiBase = (process.env.PUBLIC_API_BASE_URL ?? 'http://backend:8080/api/v1').replace(/\/$/, '');
const clientDir = join(process.cwd(), 'dist/client');
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const mime = { '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain' };
const security = { 'x-content-type-options': 'nosniff', 'x-frame-options': 'SAMEORIGIN' };
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const absolute = (base, value) => value?.startsWith('http') ? value : `${base}${value?.startsWith('/') ? '' : '/'}${value ?? ''}`;

async function api(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  let response;
  try { response = await fetch(`${apiBase}${path}`, { headers: { accept: 'application/json' }, cache: 'no-store', signal: controller.signal }); }
  catch { return { status: 503, body: { message: 'Public API unavailable' } }; }
  finally { clearTimeout(timer); }
  if (!response.ok) return { status: response.status, body: await response.text() };
  return { status: 200, body: await response.json() };
}

async function documentFor(pathname) {
  const match = pathname.match(/^\/(equipment|news)\/([^/]+)$/);
  if (!match || !uuid.test(match[2])) return { status: 404 };
  const kind = match[1] === 'equipment' ? 'product' : 'content';
  const [policy, detail] = await Promise.all([api('/public/site-policy'), api(kind === 'product' ? `/public/products/${match[2]}` : `/public/news/${match[2]}`)]);
  if (detail.status !== 200) return { status: detail.status };
  if (policy.status !== 200) return { status: policy.status, body: policy.body };
  const dto = detail.body;
  const base = policy.body.canonicalBaseUrl.replace(/\/$/, '');
  const canonical = `${base}${pathname}`;
  const title = `${kind === 'product' ? dto.name : dto.title} — ФКИТ`;
  const description = kind === 'product' ? dto.description : dto.preview;
  const image = absolute(base, kind === 'product' ? (dto.galleryImages?.[0] ?? dto.image) : dto.image);
  const jsonLd = kind === 'product'
    ? { '@context': 'https://schema.org', '@type': 'Product', name: dto.name, description: dto.description, image }
    : { '@context': 'https://schema.org', '@type': dto.type === 'NEWS' ? 'NewsArticle' : 'Article', headline: dto.title, description: dto.preview, image, datePublished: dto.date };
  const bootstrap = JSON.stringify({ kind, id: match[2], version: dto.approvedVersion, dto }).replace(/[<>&\u2028\u2029]/g, (c) => ({ '<': '\\u003c', '>': '\\u003e', '&': '\\u0026', '\u2028': '\\u2028', '\u2029': '\\u2029' })[c]);
  return { status: 200, title, description, canonical, image, kind, jsonLd, bootstrap, dto, policy: policy.body, indexingEnabled: policy.body.indexingEnabled };
}

const template = await readFile(join(clientDir, 'index.html'), 'utf8');
const { render } = await import('./dist/server/entry-server.js');
createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://landing');
  if (url.pathname === '/healthz') return response.writeHead(200, { 'content-type': 'text/plain' }).end('ok');
  if (extname(url.pathname)) {
    const file = normalize(join(clientDir, url.pathname));
    if (!file.startsWith(clientDir)) return response.writeHead(404).end();
    try { return response.writeHead(200, { ...security, 'content-type': mime[extname(file)] ?? 'application/octet-stream', 'cache-control': 'public, max-age=31536000, immutable' }).end(await readFile(file)); } catch { return response.writeHead(404, security).end(); }
  }
  const detail = await documentFor(url.pathname).catch(() => ({ status: 503 }));
  if (/^\/(equipment|news)\//.test(url.pathname)) {
    if (detail.status !== 200) return response.writeHead(detail.status, { ...security, 'cache-control': 'no-store', 'content-type': 'application/json; charset=utf-8' }).end(typeof detail.body === 'string' ? detail.body : JSON.stringify(detail.body ?? { status: detail.status, message: detail.status === 404 ? 'Not found' : 'Public API unavailable' }));
    const app = render(url.pathname, { kind: detail.kind, id: url.pathname.split('/').at(-1), version: detail.dto.approvedVersion, dto: detail.dto });
    const robots = detail.indexingEnabled ? '' : '<meta name="robots" content="noindex, nofollow">';
    const head = `<title>${escapeHtml(detail.title)}</title><meta name="description" content="${escapeHtml(detail.description)}"><link rel="canonical" href="${escapeHtml(detail.canonical)}"><meta property="og:title" content="${escapeHtml(detail.title)}"><meta property="og:description" content="${escapeHtml(detail.description)}"><meta property="og:url" content="${escapeHtml(detail.canonical)}"><meta property="og:image" content="${escapeHtml(detail.image)}"><meta property="og:type" content="${detail.kind === 'product' ? 'product' : 'article'}">${robots}<script type="application/ld+json">${JSON.stringify(detail.jsonLd).replace(/</g, '\\u003c')}</script>`;
    const withoutDefaults = template.replace(/<title[^>]*>[\s\S]*?<\/title>|<meta\s+(?:name="description"|property="og:(?:title|description|type|url|image)")[^>]*>\s*/g, '');
    return response.writeHead(200, { ...security, 'cache-control': 'no-store', 'content-type': 'text/html; charset=utf-8', ...(detail.indexingEnabled ? {} : { 'x-robots-tag': 'noindex, nofollow' }) }).end(withoutDefaults.replace('</head>', `${head}</head>`).replace('<div id="root"></div>', `<div id="root">${app}</div><script>window.__PUBLIC_SITE_POLICY__=${JSON.stringify(detail.policy)};window.__DETAIL_BOOTSTRAP__=${detail.bootstrap}</script>`));
  }
  return response.writeHead(200, { ...security, 'cache-control': 'no-store', 'content-type': 'text/html; charset=utf-8' }).end(template);
}).listen(port);
