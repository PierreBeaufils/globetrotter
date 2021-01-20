const { Pool } = require('pg');

const db = new Pool(
    {
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD

    }
);

module.exports = db;