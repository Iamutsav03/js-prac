const { products } = require("../data");

const get_product = (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((u) => {
        return u.id === id;
    })
    res.status(200).send(product || "product not found");
}

const get_all_product = (req, res) => {
    if (products.length === 0) {
        return res.status(200).send("No products has been added");
    }
    res.status(200).send(products);
}
let count = 0;
const post_product = (req, res) => {
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
}

module.exports = {
    get_all_product , get_product , post_product
}