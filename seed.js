const { Client } = require('pg');

(async () => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'movies_database',
        password: 'enigma',
        port: 5432,
    });

    try {
        await client.connect();

        await client.query(
            `create table movies (id serial primary key, title text, release_year int
        );`
        );

        await client.query(
                `create table actors (id serial primary key, name text
        );`
        );

        await client.query(
            `INSERT INTO movies (title, release_year) VALUES
                ('Toy Story', 1995),
                ('Monsters, Inc.', 2001),
                ('Finding Nemo', 2003),
                ('The Incredibles', 2004),
                ('Cars', 2006),
                ('Ratatouille', 2007),
                ('Telepusics', 2007);`,
        );

        await client.query(
            `INSERT INTO actors (name) VALUES
                ('Bruce Lee'),
                ('Nicolas Cage'),
                ('Jim Kerry');`,
        );

        console.log('Seed db succeed');
    } catch (error) {
        console.error('Error during seed db: ', error.message);
    } finally {
        client.end();
    }
})();
