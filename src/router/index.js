const { Router } = require('express');
const createActorsRoutes = require('./movies');
const createMoviesRoutes = require('./actors');

const router = Router();

function createRoutes(dbClient) {
    createMoviesRoutes(router, dbClient);
    createActorsRoutes(router, dbClient);

    return router;
}

module.exports = createRoutes;
