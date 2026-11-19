const connection = require('../config/db');

// POST: Add a new user
const postuser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const query = `
            INSERT INTO Users (name, email)
            VALUES (?, ?)
        `;

        const [result] = await connection.promise().execute(query, [name, email]);
        res.status(201).json({
            message: "User added successfully",
            userId: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding user",
            error: error.message
        });
    }
};


// GET: Fetch all users
const get_allUser = async (req, res) => {
    try {
        const query = `
            SELECT * FROM Users
        `;

        const [users] = await connection.promise().execute(query);

        res.status(200).json({
            message: "Users fetched successfully",
            users: users
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};

module.exports = {
    postuser,
    get_allUser
};