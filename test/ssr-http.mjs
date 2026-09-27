/* global process, setTimeout, fetch */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const productId = '11111111-1111-4111-8111-111111111111';
const contentId = '22222222-2222-4222-8222-222222222222';
let productReads = 0;
let siteBase = 'https://kitexp.ru';
let indexingEnabled = true;
const api = createServer((request, response) => {
  response.setHeader('content-type', 'application/json');
  if (request.url === '/api/v1/public/site-policy') return response.end(JSON.stringify({ canonicalBaseUrl: siteBase, indexingEnabled }));
  if (request.url === `/api/v1/public/products/${productId}`) { productReads += 1; return response.end(JSON.stringify({ id: productId, name: 'SSR Mixer', category: 'Mixers', image: '/m.jpg', description: 'Approved product description', galleryImages: [], fullDescription: 'Approved product body', specs: [], advantages: [], relatedContent: [], approvedVersion: 7, publishedAt: '2026-09-27T00:00:00Z' })); }
  if (request.url === `/api/v1/public/news/${contentId}`) return response.end(JSON.stringify({ id: contentId, type: 'NEWS', title: 'SSR News', date: '2026-09-27', category: 'News', image: '/n.jpg', preview: 'Approved content description', blocks: [{ type: 'paragraph', sortOrder: 0, text: 'Approved content body' }], approvedVersion: 8, publishedAt: '2026-09-27T00:00:00Z' }));
  response.statusCode = 404; response.end('{}');
});
await new Promise((resolve) => api.listen(19090, resolve));
const landing = spawn(process.execPath, ['server.mjs'], { env: { ...process.env, PORT: '18082', PUBLIC_API_BASE_URL: 'http://127.0.0.1:19090/api/v1' } });
async function waitForLanding() {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch('http://127.0.0.1:18082/healthz');
      if (response.status === 200) return;
    } catch {
      // The SSR bundle can take longer than a fixed delay to load on CI.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Landing SSR server did not become healthy within 10 seconds');
}
try {
  await waitForLanding();
  const product = await fetch(`http://127.0.0.1:18082/equipment/${productId}`);
  const productHtml = await product.text();
  assert.equal(product.status, 200); assert.equal(product.headers.get('cache-control'), 'no-store');
  assert.match(productHtml, /SSR Mixer/); assert.match(productHtml, /Approved product body/); assert.match(productHtml, /https:\/\/kitexp\.ru\/equipment/); assert.match(productHtml, /"version":7/);
  assert.equal(product.headers.get('x-robots-tag'), null);
  const content = await fetch(`http://127.0.0.1:18082/news/${contentId}`);
  const contentHtml = await content.text();
  assert.equal(content.status, 200); assert.match(contentHtml, /SSR News/); assert.match(contentHtml, /Approved content body/); assert.match(contentHtml, /NewsArticle/);
  const unknown = await fetch('http://127.0.0.1:18082/equipment/33333333-3333-4333-8333-333333333333');
  assert.equal(unknown.status, 404); assert.equal(unknown.headers.get('cache-control'), 'no-store');

  const home = await fetch('http://127.0.0.1:18082/');
  const homeHtml = await home.text();
  assert.equal(home.status, 200); assert.match(homeHtml, /rel="canonical" href="https:\/\/kitexp\.ru\/"/);
  assert.match(homeHtml, /property="og:url" content="https:\/\/kitexp\.ru\/"/);
  assert.equal(home.headers.get('x-robots-tag'), null);

  indexingEnabled = false;
  siteBase = 'https://dev.example.test';
  const devPage = await fetch('http://127.0.0.1:18082/information');
  const devHtml = await devPage.text();
  assert.equal(devPage.status, 200); assert.equal(devPage.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.match(devHtml, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(devHtml, /rel="canonical" href="https:\/\/dev\.example\.test\/information"/);
  assert.doesNotMatch(devHtml, /canonical[^>]*#|og:url[^>]*#/);
  const devDetail = await fetch(`http://127.0.0.1:18082/equipment/${productId}`);
  assert.equal(devDetail.headers.get('x-robots-tag'), 'noindex, nofollow');

  const preview = await fetch('http://127.0.0.1:18082/preview/admin');
  const previewHtml = await preview.text();
  assert.equal(preview.status, 200); assert.equal(preview.headers.get('cache-control'), 'no-store');
  assert.equal(preview.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.match(previewHtml, /<meta name="robots" content="noindex, nofollow">/);
  assert.doesNotMatch(previewHtml, /window\.__DETAIL_BOOTSTRAP__|Draft/);

  const notFound = await fetch('http://127.0.0.1:18082/not-a-real-page');
  assert.equal(notFound.status, 404); assert.equal(notFound.headers.get('x-robots-tag'), 'noindex, nofollow');
  const equipmentAlias = await fetch('http://127.0.0.1:18082/equipment', { redirect: 'manual' });
  assert.equal(equipmentAlias.status, 301); assert.equal(equipmentAlias.headers.get('location'), '/');
  const newsAlias = await fetch('http://127.0.0.1:18082/news', { redirect: 'manual' });
  assert.equal(newsAlias.status, 301); assert.equal(newsAlias.headers.get('location'), '/information#news');
  const newsSlashAlias = await fetch('http://127.0.0.1:18082/news/', { redirect: 'manual' });
  assert.equal(newsSlashAlias.status, 301); assert.equal(newsSlashAlias.headers.get('location'), '/information#news');
  const informationSlashAlias = await fetch('http://127.0.0.1:18082/information/?source=direct', { redirect: 'manual' });
  assert.equal(informationSlashAlias.status, 301); assert.equal(informationSlashAlias.headers.get('location'), '/information?source=direct');
  const previewSlashAlias = await fetch('http://127.0.0.1:18082/preview/admin/', { redirect: 'manual' });
  assert.equal(previewSlashAlias.status, 301); assert.equal(previewSlashAlias.headers.get('location'), '/preview/admin');
  const detailSlashAlias = await fetch(`http://127.0.0.1:18082/equipment/${productId}/`, { redirect: 'manual' });
  assert.equal(detailSlashAlias.status, 301); assert.equal(detailSlashAlias.headers.get('location'), `/equipment/${productId}`);

  siteBase = 'http://invalid.example.test';
  const invalidPolicy = await fetch('http://127.0.0.1:18082/about', { headers: { host: 'kitexp.ru' } });
  assert.equal(invalidPolicy.status, 503); assert.match(await invalidPolicy.text(), /policy unavailable/i);
  assert.equal(productReads, 2, 'each product response uses one approved API read; the serialized bootstrap is the hydration source');
} finally {
  landing.kill(); api.close();
}
