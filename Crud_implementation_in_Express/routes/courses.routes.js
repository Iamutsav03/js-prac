const express = require('express');
const router = express.Router();

const {courses} = require("../Data");

router.get('/', (req ,res) => {
    res.send(courses);
});

router.get('/:id', (req , res) => {
    const id = req.params.id;
    const course = courses.find((c) => c.id == id );
    if (!course) {
        return res.status(404).send("Course not found");
    }
    res.status(200).json(course);
})

module.exports = router;