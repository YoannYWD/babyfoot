//Création d'un client pour gérer la base de données

const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'Admin',
    database: 'babyfoot'
});

module.exports = pool;


