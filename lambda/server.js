const serverlessExpress = require('@vendia/serverless-express');
const express = require('express');
const next = require('next');
const path = require('path');

let serverPromise;

async function initServer() {
  const app = next({ dev: false, conf: { distDir: '.next' } });
  await app.prepare();

  const expressApp = express();

  // Serve static files from the public directory
  expressApp.use(express.static(path.join(__dirname, 'public')));

  // Let Next.js handle all other routes
  expressApp.all('*', (req, res) => {
    return app.getRequestHandler()(req, res);
  });

  return serverlessExpress({ app: expressApp });
}

// Kick off initialization once, lazily
exports.handler = async (event, context) => {
  if (!serverPromise) {
    serverPromise = initServer();
  }

  const server = await serverPromise;
  return server(event, context);
};
