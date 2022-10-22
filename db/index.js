const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movies_db',
    password: 'password',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}