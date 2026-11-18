require('dotenv').config();
const express = require('express');
const app = express();
const db = require('../Bus_Booking_System/config/db');

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})