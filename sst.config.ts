// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "website-fe",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const hostedZoneId = process.env.HOSTED_ZONE_ID;
    const certificateArn = process.env.CERTIFICATE_ARN;
    new sst.aws.Nextjs("Website", {
      domain: {
        name: "kycombinator.com",
        dns: sst.aws.dns({
          zone: hostedZoneId
        }), // Add a DNS record to the domain
        cert: certificateArn,
      },
    });

    // ✅ Redirect www → root
    const redirectFn = new aws.cloudfront.Function("RedirectWWW", {
      runtime: "cloudfront-js-1.0", // ✅ required
      code: `
        function handler(event) {
          var host = event.request.headers.host.value;
          if (host === "www.kycombinator.com") {
            return {
              statusCode: 301,
              statusDescription: "Moved Permanently",
              headers: {
                location: { value: "https://kycombinator.com" }
              }
            };
          }
          return event.request;
        }
      `,
    });
        
    const wwwRedirectDist = new aws.cloudfront.Distribution("WWWKyCombinatorRedirect", {
      aliases: ["www.kycombinator.com"],
      enabled: true,
      restrictions: {
        geoRestriction: {
          restrictionType: "none",
        },
      },
      origins: [
        {
          originId: "placeholder-origin",
          domainName: "kycombinator.com",
          customOriginConfig: {
            originProtocolPolicy: "https-only",
            httpPort: 80,
            httpsPort: 443,
            originSslProtocols: ["TLSv1.2"],
          },
        },
      ],
      defaultCacheBehavior: {
        targetOriginId: "placeholder-origin",
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: ["GET", "HEAD"],
        cachedMethods: ["GET", "HEAD"],
        cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad", // CachingDisabled
        functionAssociations: [
          {
            eventType: "viewer-request",
            functionArn: redirectFn.arn,
          },
        ],
      },
      viewerCertificate: {
        acmCertificateArn: certificateArn,
        sslSupportMethod: "sni-only",
      },
    });

    // ✅ Add this Route 53 record
    new aws.route53.Record("WWWAliasRecord", {
      name: "www.kycombinator.com",
      type: "A",
      zoneId: hostedZoneId,
      aliases: [{
        name: wwwRedirectDist.domainName,
        zoneId: "Z2FDTNDATAQYW2", // AWS' global CloudFront zone ID (always the same)
        evaluateTargetHealth: false,
      }],
    });
  },
});