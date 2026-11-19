require('dotenv').config();
const express = require('express');
const app = express();
const db = require('../Bus_Booking_System/config/db');
const userRouter = require("../Bus_Booking_System/routes/user.route");
const busRouter = require("../Bus_Booking_System/routes/bus.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user',userRouter);
app.use('/bus',busRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})