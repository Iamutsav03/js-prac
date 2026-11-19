const { connection } = require('../config/db')

const addUser = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name or email feild is empty",
                status: false
            })
        }

        const addinguserCommand =
            `INSERT INTO userdetails (name , email)
        VALUES(? ,? )`

        const [result] = await connection.promise().execute(addinguserCommand, [name, email]);

        return res.status(201).json({
            message: "User details has been added successfully",
            userId: result.insertId,
            status: true
        })
    }
    catch (err) {
        console.log(err);

        res.status(err === "ER_DUP_ENTRY" ? 409 : 500).json({
            message: err === "ER_DUP_ENTRY" ?
                "EMAIL already exists" :
                "internal server error"
        })
    }

}

const getUser = async (req, res) => {
    try {
        const query = `SELECT * FROM userdetails`
        const [result] = await connection.promise().execute(query);

        res.status(200).json({
            message: "User detials has been fetched successfully",
            data: result
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal sever error"
        });
    }

}


const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email } = req.body;

        // 1. Validate ID
        if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                message: "Invalid user ID",
                status: false
            });
        }

        // 2. Validate request body
        if (!name || !email || !name.trim() || !email.trim()) {
            return res.status(400).json({
                message: "Name and email are required",
                status: false
            });
        }

        // 3. Validate lengths
        if (name.trim().length > 25 || email.trim().length > 30) {
            return res.status(400).json({
                message: "Name or email exceeds maximum allowed length",
                status: false
            });
        }

        // 4. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                message: "Invalid email format",
                status: false
            });
        }

        // 5. Update user
        const query = `
            UPDATE userdetails
            SET name = ?, email = ?
            WHERE id = ?
        `;

        const [result] = await connection.promise().execute(
            query,
            [name.trim(), email.trim(), Number(id)]
        );

        // 6. Check if user exists
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found or no changes made",
                status: false
            });
        }

        // 7. Success response
        return res.status(200).json({
            message: "User updated successfully",
            status: true
        });

    } catch (err) {
        console.error("Update user error:", err);

        // 8. Handle duplicate email
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Email already exists",
                status: false
            });
        }

        // 9. Handle database connection errors
        if (err.code === "ECONNREFUSED" ||
            err.code === "PROTOCOL_CONNECTION_LOST") {
            return res.status(503).json({
                message: "Database unavailable",
                status: false
            });
        }

        // 10. Handle unexpected errors
        return res.status(500).json({
            message: "Internal server error",
            status: false
        });
    }
};



const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        // 1. Validate ID
        if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                message: "Invalid user ID",
                status: false
            });
        }

        // 2. Delete query
        const query = `
            DELETE FROM userdetails
            WHERE id = ?
        `;

        const [result] = await connection.promise().execute(
            query,
            [Number(id)]
        );

        // 3. Check whether user exists
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found",
                status: false
            });
        }

        // 4. Success response
        return res.status(200).json({
            message: "User deleted successfully",
            status: true
        });

    } catch (err) {
        console.error("Delete user error:", err);

        // 5. Handle foreign key constraint
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                message: "Cannot delete user because related records exist",
                status: false
            });
        }

        // 6. Handle database connection errors
        if (
            err.code === "ECONNREFUSED" ||
            err.code === "PROTOCOL_CONNECTION_LOST"
        ) {
            return res.status(503).json({
                message: "Database unavailable",
                status: false
            });
        }

        // 7. Handle unexpected errors
        return res.status(500).json({
            message: "Internal server error",
            status: false
        });
    }
};


module.exports = { addUser, getUser, updateUser, deleteUser };