const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

const connectDb = async () => {
    try {
        await pool.connect();
        console.log('Database is connected...');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    query: (text, params) => pool.query(text, params),
    connectDb
}