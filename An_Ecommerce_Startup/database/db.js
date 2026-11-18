
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'testingTable'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Connection has been established successfully");

    const createQuery = `
        CREATE TABLE users (
            Id INT AUTO_INCREMENT PRIMARY KEY,
            Name VARCHAR(20),
            Email VARCHAR(30)
        )
    `;

    connection.execute(createQuery, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Table created successfully");
        }

        connection.end();
    });
});
