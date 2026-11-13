const express = require('express');
const app = express();


app.post('/categories', (req, res) => {
    res.send('A new category has been added.');
});

app.post('/products', (req, res) => {
    res.send('A new product has been created.');
});

app.get('/categories', (req, res) => {
    res.send('Here is the list of all categories.');
});

app.get('/products', (req, res) => {
    res.send('Here is the list of all products.');
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});