mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQLHOST,
    database: process.env.MYSQLDATABASE,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD
});

module.exports = {

    GetConnectionPool: async function() {
        return pool.promise();
    }
    
}
