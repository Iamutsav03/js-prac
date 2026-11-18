const express = require('express');
const app = express();

const productroute = require('../An_Ecommerce_Startup/routes/products.route');
const userroute = require('../An_Ecommerce_Startup/routes/users.route');
const cartroute = require('../An_Ecommerce_Startup/routes/cart.route');

const db = require('../An_Ecommerce_Startup/database/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userroute);
app.use('/product', productroute);
app.use('/cart', cartroute);

app.use((req, res) => {
    res.send("<h1>Page Not Found</h1>")
})
app.listen(3000, () => {
    console.log("Server is Running on port 3000");
})