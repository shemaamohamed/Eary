const mysql = require('mysql');
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = require('../dotenv');
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;