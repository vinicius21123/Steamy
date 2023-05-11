const Pool = require('pg').Pool;

const pool = new Pool({
    user:'postgres',
    password:'',
    host:'localhost',
    port:5432,
    database:'SteamyDatabase'
})

module.exports = pool;


/*
const Pool = require('pg').Pool;

const pool = new Pool({
    user:'postgres',
    password:'',
    host:'localhost',
    port:5432,
    database:'steamy'
})

module.exports = pool;
*/