
const connection = require('../config/db');

// POST: Add a new bus
const postBus = async (req, res) => {
    try {
        const { busNumber, totalSeats, availableSeats } = req.body;

        const query = `
            INSERT INTO Buses (busNumber, totalSeats, availableSeats)
            VALUES (?, ?, ?)
        `;

        const [result] = await connection.promise().execute(
            query,
            [busNumber, totalSeats, availableSeats]
        );

        res.status(201).json({
            message: "Bus added successfully",
            busId: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding bus",
            error: error.message
        });
    }
};


// GET: Fetch buses with available seats greater than requested
const get_busAvailable_Seat = async (req, res) => {
    try {
        const seat = Number(req.params.seat);

        if (!Number.isInteger(seat) || seat < 0) {
            return res.status(400).json({
                message: "Please provide a valid seat count"
            });
        }

        const query = `
            SELECT * FROM Buses
            WHERE availableSeats > ?
        `;

        const [buses] = await connection.promise().execute(
            query,
            [seat]
        );

        res.status(200).json({
            message: "Buses fetched successfully",
            count: buses.length,
            buses: buses
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching buses",
            error: error.message
        });
    }
};


// Export functions
module.exports = {
    postBus,
    get_busAvailable_Seat
};
