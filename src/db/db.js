const { Client } = require('pg');

async function creteDbClient() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'movies_database',
        password: 'enigma',
        port: 5432,
    });

    try {
        await client.connect();
        console.log('Connected to db successfully');
    } catch (error) {
        console.error('Cannot connect to db', error.message);
    }

    return client;
}

module.exports = creteDbClient;
