const path = require('path');


const { all_products } = require('../services/product.service');

const get_all_product = (req, res) => {
    const products = all_products();
    if (products.length === 0) {
        return res.sendFile(path.join(__dirname,'..','view','products.html'));
    }
    res.send(products);
}

module.exports = get_all_product;