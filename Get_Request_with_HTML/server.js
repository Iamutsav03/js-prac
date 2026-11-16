const express = require('express');
const app = express();
const products = require('../Get_Request_with_HTML/routes/product.route');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/product", products);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})