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
    const certificateArn = process.env.CERTIFICATE_ARN!; // apex cert is enough
    const region = process.env.AWS_REGION || "us-east-1";

    // 1) Primary site on apex: kycombinator.com
    new sst.aws.Nextjs("Website", {
      domain: {
        name: "kycombinator.com",
        dns: sst.aws.dns({ zone: hostedZoneId }),
        cert: certificateArn,
      },
    });

    // 2) S3 bucket for www -> apex redirect (preserves path + query)
    const wwwBucket = new aws.s3.BucketV2("WwwBucket", {
      bucket: "www.kycombinator.com",
      // No need to open public ACLs; website redirect doesn't serve objects
      forceDestroy: false,
      tags: { app: "website-fe", purpose: "www-redirect" },
    });

    // 3) Configure static website redirect
    new aws.s3.BucketWebsiteConfigurationV2("WwwWebsite", {
      bucket: wwwBucket.id,
      redirectAllRequestsTo: {
        // NOTE: property names are "hostName" + "protocol" on this resource
        hostName: "kycombinator.com",
        protocol: "https",
      },
    });

    // 4) Route 53: CNAME www -> S3 website endpoint
    // S3 website endpoint pattern is deterministic:
    //   <bucket>.s3-website-<region>.amazonaws.com
    const s3WebsiteEndpoint = `www.kycombinator.com.s3-website-${region}.amazonaws.com`;

    new aws.route53.Record("WWWRecord", {
      name: "www",              // => www.kycombinator.com
      type: "CNAME",
      zoneId: hostedZoneId,
      records: [s3WebsiteEndpoint],
      ttl: 300,
    });

    // Done:
    // https://www.kycombinator.com/anything -> 301 -> https://kycombinator.com/anything
  },
});
