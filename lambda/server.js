const serverlessExpress = require('@vendia/serverless-express');
const express = require('express');
const next = require('next');

let serverPromise;

async function initServer() {
  const app = next({ dev: false, conf: { distDir: '.next' } });
  await app.prepare();

  const expressApp = express();

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
