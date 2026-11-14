const express = require('express');
const router = express.Router();

const {students} = require("../Data");

router.get('/', (req ,res) => {
    res.send(students);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).send("Student not found");
    }

    res.status(200).json(student);
});

module.exports = router;