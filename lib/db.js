const mysql = require('mysql')

var db = mysql.createPool({
    host: 'localhost',
    user: 'vhost',
    password: 'rbTZFabZ3wn7qNI7',
    database: 'vhost'
})

db.getConnection(err => {
    if (err) {
        console.log(err)
        console.log('Error establishing connection with database.')
        process.exit(1)
    }

    console.log('Database connection successful.')
})

// var generateSchema = () => {
//     var queries = [`
//         CREATE TABLE IF NOT EXISTS websites (
//             wid int(255) PRIMARY KEY AUTO_INCREMENT,
//             uid int(11),
//             name varchar(11) UNIQUE,
//             status varchar(255),
//             notes varchar(10000),
//             date varchar(255)
//         ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
//     `, `
//         CREATE TABLE IF NOT EXISTS domains (
//             did int(255) PRIMARY KEY AUTO_INCREMENT,
//             name varchar(11) UNIQUE,
//             domain varchar(255),
//             date varchar(255)
//         ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
//     `]

//     for (query in queries) {
//         db.query(queries[query], (err) => {
//             if (err) console.log(err)
//         })
//     }
// }
// generateSchema()

module.exports = db