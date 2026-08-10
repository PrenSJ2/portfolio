/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'portfolio',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: { aws: { region: 'us-east-1' } },
    };
  },
  async run() {
    new sst.aws.StaticSite('Portfolio', {
      build: {
        // Intentionally a no-op — NOT 'npm run build'. The CI workflow (and
        // `npm run deploy` locally) already runs `npm run build` followed by
        // `npm run verify` *before* this SST deploy starts, and AWS
        // credentials are only assumed after both pass. If this ran the real
        // build, SST would silently rebuild from source here, discarding the
        // verified `build/client` artifact and shipping an unverified one —
        // gating `verify` against bits that never ship. Do not "fix" this
        // back to `npm run build`.
        command: 'echo "using pre-built build/client"',
        output: 'build/client',
      },
      domain: {
        name: 'seb.onlineo.live',
        dns: sst.aws.dns({ zone: 'Z04825702KKCLX3C6NSRH' }),
      },
      errorPage: '404.html',

      // Unmatched paths reach the 404 page down TWO different routes, so both
      // halves below are required and they cover disjoint cases.
      //
      // SST only writes root-level files into its CloudFront KeyValueStore;
      // every subdirectory becomes a prefix "route" instead. So:
      //
      //  a) A top-level miss (`/nope`) matches no KV key and no route prefix,
      //     so SST's viewer-request router rewrites it to `errorPage` and S3
      //     returns it with status 200. Only `viewerResponse` can correct that.
      //
      //  b) A nested miss (`/projects/does-not-exist`) matches the `/projects`
      //     route prefix, so the router rewrites it to
      //     `/projects/does-not-exist/index.html` and sends it to S3. That key
      //     does not exist and the OAC principal has no `s3:ListBucket`, so S3
      //     answers 403 AccessDenied with a raw XML body. The router never sees
      //     this — it happens at the origin — so only `customErrorResponses`
      //     can correct it.
      //
      // The two never double-apply: the viewerResponse rewrite is guarded on
      // `statusCode === 200`, and in case (b) CloudFront has already set 404.
      //
      // !! UPGRADING SST WILL SILENTLY BREAK THIS !!
      //
      // None of the above is a documented API contract. It is coupled to SST's
      // *internal* router behaviour in 3.19.3 — specifically that only
      // root-level files go into the KV store, that subdirectories become
      // prefix routes, and that a nested miss therefore surfaces as an origin
      // 403 rather than being handled by the router. `sst` is pinned to exactly
      // 3.19.3 in package.json for this reason; do not loosen it to a range.
      //
      // If SST is upgraded, these two mechanisms can start to overlap (double
      // application) or leave a gap (soft 200s on missing pages) with no error
      // and no build failure — the site just quietly starts lying to crawlers.
      // After ANY SST version change, redeploy and re-verify all four cases:
      //
      //   /nope                     -> 404 + styled page  (viewerResponse path)
      //   /projects/does-not-exist  -> 404 + styled page  (customErrorResponses path)
      //   /assets/nope.js           -> 404 + styled page  (miss under an asset prefix)
      //   /404.html                 -> 404 + styled page  (direct request)
      //
      // "Styled page" means the body contains "Error: redacted"; a raw
      // <Error><Code>AccessDenied</Code> XML body or a 200 means it is broken.
      // Also re-check that all 14 real routes still return 200 with their own
      // distinct <title>, to catch the opposite failure of over-applying.
      transform: {
        cdn: {
          customErrorResponses: [
            // 403 is what S3 actually returns for a missing key under OAC
            // without `s3:ListBucket`; 404 is included for completeness.
            {
              errorCode: 403,
              responseCode: 404,
              responsePagePath: '/404.html',
              errorCachingMinTtl: 0,
            },
            {
              errorCode: 404,
              responseCode: 404,
              responsePagePath: '/404.html',
              errorCachingMinTtl: 0,
            },
          ],
        },
      },
      edge: {
        viewerResponse: {
          injection: `
if (event.request.uri === '/404.html' && event.response.statusCode === 200) {
  event.response.statusCode = 404;
  event.response.statusDescription = 'Not Found';
}`,
        },
      },
    });
  },
});
