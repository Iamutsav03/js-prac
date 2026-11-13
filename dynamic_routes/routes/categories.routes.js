const express = require('express');

const app = express.Router();

app.get('/', (req , res) => {
    res.send('These are all the categories');
})

app.post('/', (req, res) => {
    res.send('This category has been posted');
})

module.exports = app;
