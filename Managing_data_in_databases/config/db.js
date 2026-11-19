const sql = require("mysql2");

const connection = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "usertestingdb"
});

async function initializeConnection() {
    try {
        await connection.promise().connect();

        console.log("DB Connected");

        const table = `
            CREATE TABLE IF NOT EXISTS userdetails (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(25) NOT NULL,
                email VARCHAR(30) NOT NULL UNIQUE
            )
        `;

        await connection.promise().execute(table);

        console.log("Table created successfully");

    } catch (err) {
        console.error("Database error:", err);
        throw err;
    }
}

module.exports = {
    connection,
    initializeConnection
};
