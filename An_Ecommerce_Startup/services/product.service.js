
const { products } = require("../data");

let count = 0;

// Get product by ID
const get_product = (id) => {
    const product = products.find((u) => u.id === id);
    return product;
};

// Get all products
const get_all_product = () => {
    return products;
};

// Add new product
const post_product = (product) => {
    count++;

    const newproduct = {
        id: count,
        product: product
    };

    products.push(newproduct);

    return newproduct;
};

module.exports = {
    get_product,
    get_all_product,
    post_product
};
