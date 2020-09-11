const mysql = require('mysql');
const conn = mysql.createConnection({
host: 'localhost',
port: '3306',
user: 'root',
password: '123456',
database: 'student'
});

module.exports = {
    mysql,
    conn
}

