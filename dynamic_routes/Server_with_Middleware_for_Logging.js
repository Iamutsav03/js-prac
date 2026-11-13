const express = require('express');
const app = express();

app.use((req , res , next) => {
    const method = req.method;
    const url = req.url;
    console.log(`Method - ${method} : URL - ${url}`);
    next();
});

app.post('/products/:id', (req, res) => {
    const id = req.params.id;
    res.send(`product with id ${id} has been posted`);
});
app.post('/categories/:id', (req, res) => {
    const id = req.params.id;
    res.send(`category with id ${id} has been posted`);
});
app.get('/products/:id', (req, res) => {
    res.send("Here is the List of all products");
});
app.get('/categories/:id', (req, res) => {
    res.send("Here is the List of all category");
});

app.listen(4000, (req, res) => {
    console.log("Server is running on port 4000");
})