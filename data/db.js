const mysql = require('mysql2');
const connection = msql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'HorasDundragon93!',
    database: 'movies_db'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

module.exports = connection;
