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
        command: 'npm run build',
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
