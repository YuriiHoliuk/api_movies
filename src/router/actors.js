function createActorsRoutes(router, dbClient) {
    router.get('/actors', async (req, res) => {
        const result = await dbClient.query('select * from actors;');
        res.json(result.rows);
    });
}

module.exports = createActorsRoutes;