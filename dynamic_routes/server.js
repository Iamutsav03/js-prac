const express = require('express');

const app = express();

app.get('/home/:username', (req, res) => {
    const username = req.params.username;
    const role = req.query.role;
    res.send(`Welcome, ${username}! Your role is: ${role}`);
});

app.listen(() => {
    console.log("Server is running on port 3000");
});