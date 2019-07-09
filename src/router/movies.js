const { MoviesModel } = require('../db');

function createMoviesRoutes(router, dbClient) {
    const moviesModel = new MoviesModel(dbClient);

    router.get('/movies', async (req, res) => {
        res.json(await moviesModel.get());
    });

    router.get('/movies/:movieId(\\d+)', async (req, res) => {
        try {
            const movieById = await moviesModel.getById(req.params.movieId);
            res.json(movieById);
        } catch (error) {
            res.sendStatus(error);
        }
    });

    router.get('/movies/titles', (req, res) => {
        dbClient.query('select title from movies order by title ',
            (err, result) => {
                res.json(result.rows)
            });
    });

    router.get('/movies/titles/:year(\\d+)', (req, res) => {
        dbClient.query('select title from movies where release_year = $1 order by title',
            [req.params.year],
            (err, result) => {
                res.json(result.rows)
            });
    });

    router.post('/movies/:year(\\d+)/:title', (req, res) => {
        const { title, year} = req.params;
        dbClient.query('insert into movies ("title", "release_year") values ($1, $2) returning id',
            [title, year],
            (err, result) => {
                res.json(result.rows[0]);
            });
    });

    router.put('/movies/:id(\\d+)/:title/:year(\\d+)', (req, res) => {
        const { title, year, id} = req.params;
        dbClient.query('update movies set title = $1, release_year = $2 where id = $3',
            [title, year, id],
            (err, result) => {
                res.json(result.rowCount);
            });
    });

    router.delete('/movies/:id(\\d+)', (req, res) => {
        dbClient.query('delete from movies where id = $1',
            [req.params.id],
            (err, result) => {
                res.json(result.rowCount);
            })
    });
}

module.exports = createMoviesRoutes;
