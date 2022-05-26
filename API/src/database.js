const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '14Z08o99',
    database: 'company'
})

mysqlConnection.connect(function (err) {
    if(err) {
        console.log(err);
    } else {
        console.log('The database is connected')
    }
})

module.exports = mysqlConnection