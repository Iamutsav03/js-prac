const path = require('path');

const {
    getProducts,
    addProduct
} = require('../services/product.service');

const get_all_products = (req, res) => {
    res.sendFile(path.join(__dirname, '../view/products.html'));
};

const post_product = (req, res) => {
    const productName = req.body.productName;

    addProduct(productName);

    res.redirect('/product/all');
};

const show_products = (req, res) => {
    const products = getProducts();

    res.send(`
        <h1>Available Products</h1>
        <ul>
            ${products.map(product =>
        `<li>${product.id} - ${product.productName}</li>`
    ).join('')}
        </ul>
        <a href="/product">Add Another Product</a>
    `);
};

module.exports = {
    get_all_products,
    post_product,
    show_products
};