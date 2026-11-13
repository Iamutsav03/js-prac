const express = require('express');

const app = express.Router();

app.get('/', (req , res) => {
    res.send('These are all the products');
})

app.post('/', (req, res) => {
    res.send('This product has been posted');
})

module.exports = app;
