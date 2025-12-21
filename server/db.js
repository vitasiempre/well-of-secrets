const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "3108",
    host: "localhost",
    port: 5432,
    database: "wellofsecrets"
})

module.exports = pool;