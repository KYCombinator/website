module.exports = {
    output: 'standalone',
    // optionally use: output: 'export' if full static
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.kycombinator.com',
        },
      ],
    },
  };