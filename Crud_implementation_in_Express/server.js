const express = require('express');
const app = express();

const students = require("../Crud_implementation_in_Express/routes/students.routes");
const courses = require("../Crud_implementation_in_Express/routes/courses.routes");

app.use('/students', students);
app.use('/courses', courses);

app.use((req , res) => {
    res.status(404).send("<h1>Page NOT Found</h1>");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})