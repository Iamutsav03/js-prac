const express = require('express');
const router = express.Router();

let count_id = 0;
const temp_store = {};

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(temp_store[id] || "Book not found!");
});

router.get('/', (req, res) => {
    res.send(temp_store);
});

router.post('/:description', (req, res) => {
    const description = req.params.description;

    count_id++;

    temp_store[count_id] = description;

    res.send("Book has been added!");
});

module.exports = router;