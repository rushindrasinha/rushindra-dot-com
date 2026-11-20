const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { NextRequest } = require('next/server');
const root = path.resolve(__dirname, '..');
function load(file) {
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const result = {};
  new Function('require', 'exports', source)((id) => id.startsWith('.') ? load(path.resolve(path.dirname(file), id + '.ts')) : require(id), result);
  return result;
}
const { proxy } = load(path.join(root, 'proxy.ts'));
function request(host, route, markdown = false) {
  return proxy(new NextRequest('https://' + host + route, { headers: { host, accept: markdown ? 'text/markdown' : 'text/html' } }));
}
(async () => {
  let r = request('rushi.live', '/?utm_source=test');
  assert.equal(r.headers.get('x-middleware-rewrite'), 'https://rushi.live/live?utm_source=test');
  assert.equal(r.headers.get('location'), null);
  r = request('rushindra.com', '/live?utm_source=test');
  assert.equal(r.status, 308);
  assert.equal(r.headers.get('location'), 'https://rushi.live/?utm_source=test');
  r = request('www.rushi.live', '/?x=1');
  assert.equal(r.headers.get('location'), 'https://rushi.live/?x=1');
  assert.equal(request('rushi.live', '/api/live').headers.get('x-middleware-next'), '1');
  assert.equal(request('rushi.live', '/_vercel/insights/script.js').headers.get('x-middleware-next'), '1');
  assert.equal(request('rushi.live', '/_next/static/chunk.js').headers.get('x-middleware-next'), '1');
  assert.equal(request('rushindra.com', '/_next/static/chunk.js', true).headers.get('x-middleware-next'), '1');
  assert.equal(request('rushindra.com', '/').headers.get('x-middleware-next'), '1');
  assert.equal(request('rushindra.com', '/', true).headers.get('x-middleware-rewrite'), 'https://rushindra.com/index.md');
  assert.equal(request('preview.vercel.app', '/live', true).status, 200);
  const liveMarkdown = await request('rushi.live', '/', true).text();
  assert.match(liveMarkdown, /Rushi Live/);
  assert.match(liveMarkdown, /youtube.com/);
  for (const route of ['/login', '/login/', '/reset-password?token=secret', '/signup', '/auth/callback', '/forgot-password', '/about', '/v4/index.html', '/api/private']) {
    const response = request('rushi.live', route);
    assert.equal(response.status, 404, route);
    assert.equal(response.headers.get('location'), null, route);
    assert.equal(response.headers.get('x-middleware-rewrite'), null, route);
    assert.doesNotMatch(await response.text(), /prompt|secret/i);
  }
  assert.match(await request('rushi.live', '/robots.txt').text(), /Sitemap: https:\/\/rushi.live\/sitemap.xml/);
  assert.doesNotMatch(await request('rushi.live', '/sitemap.xml').text(), /rushindra.com|prompt/i);
  for (const route of ['/llm', '/llms.txt', '/index.md']) assert.match(await request('rushi.live', route).text(), /Rushi Live/);
  const files = ['app/page.tsx', 'app/about/page.tsx', 'app/index.md/route.ts', 'app/llm/route.ts', 'public/llms.txt', 'public/v4/index.html'];
  for (const file of files) assert.doesNotMatch(fs.readFileSync(path.join(root, file), 'utf8'), /rushi\.live|prompt engine|prompt intelligence|prompts?\.rushindra\.com/i, file);
  assert.match(fs.readFileSync(path.join(root, 'app/live/page.tsx'), 'utf8'), /href="https:\/\/rushindra.com\/"/);
  console.log('PASS: live-host routing, query preservation, assets/API, markdown, metadata endpoints, legacy-auth privacy and public-copy removal');
})().catch((error) => { console.error(error); process.exitCode = 1; });
