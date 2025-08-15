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
    // CloudFront Function: preserve path + query when redirecting www -> apex
    const redirectFn = new aws.cloudfront.Function("RedirectWWW", {
      runtime: "cloudfront-js-1.0",  // ✅ required
      code: `
        function handler(event) {
          var req = event.request;
          var host = (req.headers.host && req.headers.host.value || "").toLowerCase();

          if (host === "www.kycombinator.com") {
            var uri = req.uri || "/";
            var qs = req.querystring || {};
            var keys = Object.keys(qs);
            var qsStr = "";
            if (keys.length > 0) {
              var pairs = [];
              for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var entry = qs[k];
                if (entry && typeof entry.value === "string") {
                  pairs.push(encodeURIComponent(k) + "=" + encodeURIComponent(entry.value));
                }
                if (entry && entry.multiValue) {
                  for (var j = 0; j < entry.multiValue.length; j++) {
                    var mv = entry.multiValue[j];
                    if (mv && typeof mv.value === "string") {
                      pairs.push(encodeURIComponent(k) + "=" + encodeURIComponent(mv.value));
                    }
                  }
                }
              }
              if (pairs.length > 0) qsStr = "?" + pairs.join("&");
            }

            var location = "https://kycombinator.com" + uri + qsStr;

            return {
              statusCode: 301,
              statusDescription: "Moved Permanently",
              headers: {
                location: { value: location }
                // Optional HSTS:
                //, "strict-transport-security": { value: "max-age=31536000; includeSubDomains; preload" }
              }
            };
          }

          return req;
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