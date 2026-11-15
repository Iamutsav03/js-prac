
const express = require('express');
const router = express.Router();

const { users, products, cart } = require("../data");

router.get('/:id', (req, res) => {
    const user_id = Number(req.params.id);

    const user = users.find((u) => u.id === user_id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const userCart = cart.filter((u) => u.user_id === user_id);
    if (userCart.length === 0) {
        return res.send("Cart is empty");
    }

    res.status(200).json(userCart);
});

// ADD PRODUCT TO USER CART
router.post('/:id', (req, res) => {
    const user_id = Number(req.params.id);
    const product_id = Number(req.body.product_id);

    // Check user
    const user = users.find((u) => u.id === user_id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Check product
    const product = products.find((p) => p.id === product_id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    // Add product to cart
    const newItem = {
        user_id: user_id,
        product_id: product.id,
        product: product.product
    };

    cart.push(newItem);

    res.status(201).json({
        message: "Product added to cart successfully",
        item: newItem
    });
});

module.exports = router;
