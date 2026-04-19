const mysql = require('mysql2');

const db = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '07102005',
        database: 'inventory_db'
});
db.connect(err => {
    if (err) {
        console.log("Database connection fail: ", err)
    } else {
        console.log("Connected to inventory_db");
    }
});

module.exports = db;