const products = require('../data/products');

let count = 0;

const getProducts = () => {
    return products;
};

const addProduct = (productName) => {
    count++;

    const newProduct = {
        id: count,
        productName: productName
    };

    products.push(newProduct);

    return newProduct;
};

module.exports = {
    getProducts,
    addProduct
};