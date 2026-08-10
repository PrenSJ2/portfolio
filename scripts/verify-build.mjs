import { readFile } from 'node:fs/promises';

const dir = 'build/client';

const routes = [
  '/',
  '/uses',
  '/articles',
  '/articles/django-elastic-beanstalk',
  '/articles/instagram-platform-api',
  '/projects/ancient-bots',
  '/projects/fitcheck',
  '/projects/mormonize',
  '/projects/slice',
  '/projects/smart-sparrow',
  '/projects/teamworks',
  '/projects/thoth',
  '/projects/volkihar-knight',
  '/projects/voulez-vous',
];

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
