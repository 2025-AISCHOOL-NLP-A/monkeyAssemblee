const mysql = require('mysql2');
const conn = mysql.createConnection({
    host:'localhost',
    user :"root",
    password:"dlstkry6rl",
    port : 3306,
    database : "nodejs"
});

conn.connect();
module.exports =conn;


