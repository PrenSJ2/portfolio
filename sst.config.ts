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
      // SST's CloudFront router rewrites an unmatched path to `errorPage` and
      // serves it from S3, which responds 200. Restore the real 404 status so
      // crawlers and clients see a genuine "not found".
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
