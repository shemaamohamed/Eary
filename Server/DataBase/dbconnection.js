const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eary'
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }


    console.log('connected as id ' + connection.threadId);
    let sql = "SELECT * FROM history";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("selecting");
        console.log(result);
        connection.end();
    });
});





module.exports = connection;