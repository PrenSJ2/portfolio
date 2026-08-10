import { rename, rm } from 'node:fs/promises';

const dir = 'build/client';

await rename(`${dir}/404/index.html`, `${dir}/404.html`);
await rm(`${dir}/404`, { recursive: true, force: true });

// react-router build with ssr:false unconditionally prerenders an
// __spa-fallback.html (see @react-router/dev/dist/vite.js), even when an
// explicit `prerender` list is given. Nothing in this site's routing or
// hosting config references it (CloudFront's 404 handling uses 404.html,
// not a SPA catch-all), so it's removed to keep the static output limited
// to the routes we actually define.
await rm(`${dir}/__spa-fallback.html`, { force: true });

console.log('Flattened 404/index.html -> 404.html');
