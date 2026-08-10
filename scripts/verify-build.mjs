import { readFile } from 'node:fs/promises';
import reactRouterConfig from '../react-router.config.js';

const dir = 'build/client';

// The prerender list is the source of truth (react-router.config.js). `/404`
// is handled separately below since it maps to `404.html`, not
// `404/index.html`.
const routes = reactRouterConfig.prerender.filter(route => route !== '/404');

const failures = [];

async function check(label, file, assertions) {
  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    failures.push(`${label}: missing ${file}`);
    return;
  }
  for (const [description, passed] of assertions(html)) {
    if (!passed) failures.push(`${label}: ${description}`);
  }
}

function bodyTagAssertion(html) {
  const match = html.match(/<body[^>]*>/);
  const bodyTag = match ? match[0] : '';
  return ['body tag must not bake in data-theme', !bodyTag.includes('data-theme')];
}

for (const route of routes) {
  const file = `${dir}${route === '/' ? '' : route}/index.html`;
  await check(route, file, html => [
    ['has a non-empty <title>', /<title>[^<]+<\/title>/.test(html)],
    ['has prerendered body content', html.length > 5000],
    bodyTagAssertion(html),
  ]);
}

await check('404', `${dir}/404.html`, html => [
  ['has a non-empty <title>', /<title>[^<]+<\/title>/.test(html)],
  bodyTagAssertion(html),
]);

if (failures.length) {
  console.error(`Build verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`Build verification passed: ${routes.length + 1} pages.`);
