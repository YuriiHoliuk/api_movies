const express = require('express');
const { creteDbClient } = require('./db');
const createRouter = require('./router');

async function createApp() {
    const dbClient = await creteDbClient();
    const router = createRouter(dbClient);
    const app = express();

    app.use(router);

    return {
      listen(port) {
          app.listen(port);
          console.log(`app listen on port: ${port}`);
      },
      stop() {
          dbClient.end();
      },
    };
}

module.exports = createApp;
