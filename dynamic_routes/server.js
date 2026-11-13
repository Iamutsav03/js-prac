const express = require('express');

const app = express();
const order = require('../dynamic_routes/routes/orders.routes');
const category = require('../dynamic_routes/routes/categories.routes');

app.use('/orders', order);
app.use('/categories', category);

app.get('/home/:username', (req, res) => {
    const username = req.params.username;
    const role = req.query.role;
    res.send(`Welcome, ${username}! Your role is: ${role}`);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});