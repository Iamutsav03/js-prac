
const {
    get_product,
    get_all_product,
    post_product
} = require("../services/productServices");

// Get product by ID
const get_product_controller = (req, res) => {
    const id = Number(req.params.id);

    const product = get_product(id);

    res.status(200).send(product || "product not found");
};

// Get all products
const get_all_product_controller = (req, res) => {
    const products = get_all_product();

    if (products.length === 0) {
        return res.status(200).send("No products has been added");
    }

    res.status(200).send(products);
};

// Add product
const post_product_controller = (req, res) => {
    const product = req.body.product;

    const newproduct = post_product(product);

    res.status(201).json({
        message: "product added successfully",
        product: newproduct
    });
};

module.exports = {
    get_product_controller,
    get_all_product_controller,
    post_product_controller
};
