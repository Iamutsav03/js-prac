const express = require('express');
const router = express.Router();
const { users } = require("../data");
let count = 0;

router.get('/', (req, res) => {
    if (users.length === 0) {
        return res.status(200).send("No users has been added");
    }
    res.status(200).send(users);
});
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => {
        return u.id === id;
    })
    res.status(200).send(user || "user not found");
});
router.post('/', (req, res) => {
    const name = req.body.name;

    count++;

    const newUser = {
        id: count,
        name: name
    };

    users.push(newUser);

    res.status(201).json({
        message: "User added successfully",
        user: newUser
    });
});

module.exports = router;
