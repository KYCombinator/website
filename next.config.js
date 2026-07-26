module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'cdn.kycombinator.com',
        },
      ]
    },
    // Keep non-production deploys (e.g. dev.kycombinator.com) out of search
    // engines. The dev deploy sets DEPLOY_NOINDEX=1 at build time; production
    // leaves it unset and serves no such header.
    async headers() {
      if (process.env.DEPLOY_NOINDEX === '1') {
        return [
          {
            source: '/:path*',
            headers: [
              { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
            ],
          },
        ];
      }
      return [];
    },
  }
