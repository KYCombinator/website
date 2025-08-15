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
    const hostedZoneId = process.env.HOSTED_ZONE_ID!;
    const certificateArn = process.env.CERTIFICATE_ARN!; // Must be in us-east-1 and include SAN for www.kycombinator.com

    // 1) Primary Next.js site on apex: kycombinator.com
    new sst.aws.Nextjs("Website", {
      domain: {
        name: "kycombinator.com",
        dns: sst.aws.dns({ zone: hostedZoneId }),
        cert: certificateArn,
      },
    });

    // 2) CloudFront Function to redirect www -> apex while preserving path + query
    const redirectFn = new aws.cloudfront.Function("RedirectWWW", {
      runtime: "cloudfront-js-1.0",
      code: `
        function handler(event) {
          var req = event.request || {};
          var host = (req.headers && req.headers.host && req.headers.host.value || "").toLowerCase();

          if (host === "www.kycombinator.com") {
            var uri = req.uri || "/";
            var qs = req.querystring || {};
            var keys = Object.keys(qs);
            var qsStr = "";
            if (keys.length > 0) {
              var parts = [];
              for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var e = qs[k];
                if (e && typeof e.value === "string") {
                  parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(e.value));
                }
                if (e && e.multiValue) {
                  for (var j = 0; j < e.multiValue.length; j++) {
                    var mv = e.multiValue[j];
                    if (mv && typeof mv.value === "string") {
                      parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(mv.value));
                    }
                  }
                }
              }
              if (parts.length > 0) qsStr = "?" + parts.join("&");
            }

            return {
              statusCode: 301,
              statusDescription: "Moved Permanently",
              headers: {
                location: { value: "https://kycombinator.com" + uri + qsStr }
                // Optional: HSTS
                //, "strict-transport-security": { value: "max-age=31536000; includeSubDomains; preload" }
              }
            };
          }

          return req;
        }
      `,
    });

    // 3) Minimal CloudFront distribution that owns the www alias and always 301s at viewer-request
    const wwwRedirectDist = new aws.cloudfront.Distribution("WWWKyCombinatorRedirect", {
      aliases: ["www.kycombinator.com"],
      enabled: true,
      // Origin won't be reached because we return at viewer-request,
      // but CloudFront requires one. Using apex as a dummy origin is fine.
      origins: [
        {
          originId: "dummy-origin",
          domainName: "kycombinator.com",
          customOriginConfig: {
            originProtocolPolicy: "https-only",
            httpsPort: 443,
            httpPort: 80,
            originSslProtocols: ["TLSv1.2"],
          },
        },
      ],
      defaultCacheBehavior: {
        targetOriginId: "dummy-origin",
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: ["GET", "HEAD"],
        cachedMethods: ["GET", "HEAD"],
        // AWS managed "CachingDisabled" so the function runs on every request
        cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
        functionAssociations: [
          { eventType: "viewer-request", functionArn: redirectFn.arn },
        ],
      },
      restrictions: { geoRestriction: { restrictionType: "none" } },
      viewerCertificate: {
        acmCertificateArn: certificateArn, // MUST include www.kycombinator.com
        sslSupportMethod: "sni-only",
      },
      priceClass: "PriceClass_100",
    });

    // 4) Route 53 alias: www -> the CloudFront redirect distribution (A + AAAA)
    new aws.route53.Record("WWWAliasA", {
      name: "www.kycombinator.com",
      type: "A",
      zoneId: hostedZoneId,
      aliases: [
        {
          name: wwwRedirectDist.domainName,
          zoneId: "Z2FDTNDATAQYW2", // Global CloudFront hosted zone ID
          evaluateTargetHealth: false,
        },
      ],
    });

    new aws.route53.Record("WWWAliasAAAA", {
      name: "www.kycombinator.com",
      type: "AAAA",
      zoneId: hostedZoneId,
      aliases: [
        {
          name: wwwRedirectDist.domainName,
          zoneId: "Z2FDTNDATAQYW2",
          evaluateTargetHealth: false,
        },
      ],
    });
  },
});
