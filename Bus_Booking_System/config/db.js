
const mysql = require('mysql2');

const createTable = [
    `CREATE TABLE Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
    )`,

    `CREATE TABLE Buses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        busNumber VARCHAR(30) NOT NULL,
        totalSeats INT NOT NULL,
        availableSeats INT NOT NULL
    )`,

    `CREATE TABLE Bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seatNumber INT NOT NULL
    )`,

    `CREATE TABLE Payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        amountPaid DECIMAL(10,2) NOT NULL,
        paymentStatus VARCHAR(30) NOT NULL
    )`
];

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.Db_password,
    database: "Bus_Booking"
});

async function initializeDatabase() {
    try {
        await db.promise().connect();

        console.log("DB has been connected successfully");

        for (const table of createTable) {
            await db.promise().execute(table);
        }

        console.log("All tables created successfully");

    } catch (err) {
        console.error("Database error:", err);
    }
}

initializeDatabase();

module.exports = db;
