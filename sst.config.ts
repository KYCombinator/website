// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "auth-fe",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("Auth", {
      domain: {
        name: "auth.kycombinator.com",
        dns: sst.aws.dns({
          zone: "Z03959821AG8UGYCERATS"
        }), // Add a DNS record to the domain
        cert: "arn:aws:acm:us-east-1:418295680070:certificate/ad7aa75a-4101-4a50-b14c-2d0c736094f8",
      },
    });
  },
});