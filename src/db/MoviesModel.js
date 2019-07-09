class MoviesModel {
    constructor(dbClient) {
        this.client = dbClient;
    }

    async get() {
        const result = await this.client.query('select * from movies order by release_year;');
        return result.rows;
    }

    async getById(id) {
        const result = await this.client.query('select * from movies where id = $1',
            [id],
        );

        if (result.rows.length === 0) {
            throw 404;
        } else {
            return result.rows[0];
        }
    }
}

module.exports = MoviesModel;