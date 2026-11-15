const express = require('express');
const router = express.Router();
const { products } = require("../data");
let count = 0;

router.get('/', (req, res) => {
    if (products.length === 0) {
        return res.status(200).send("No products has been added");
    }
    res.status(200).send(products);
});
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((u) => {
        return u.id === id;
    })
    res.status(200).send(product || "product not found");
});
router.post('/', (req, res) => {
    const product = req.body.product;

    count++;

    const newproduct = {
        id: count,
        product: product
    };

    products.push(newproduct);

    res.status(201).json({
        message: "product added successfully",
        product: newproduct
    });
});

module.exports = router;