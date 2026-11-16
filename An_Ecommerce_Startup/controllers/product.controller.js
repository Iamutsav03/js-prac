const {
    get_product,
    get_all_product,
    post_product
} = require("../services/productServices");

const {
    sendErrorResponse,
    sendResponse
} = require("../utils/response");


const get_product_controller = (req, res) => {
    try {
        const id = Number(req.params.id);

        const product = get_product(id);

        if (!product) {
            return sendErrorResponse(res, {
                message: "Product not found",
                statusCode: 404
            });
        }

        return sendResponse(res, product, 200);

    } catch (err) {
        return sendErrorResponse(res, {
            message: err.message,
            statusCode: 500
        });
    }
};

const get_all_product_controller = (req, res) => {
    try {
        const products = get_all_product();

        if (products.length === 0) {
            return sendErrorResponse(res, {
                message: "No products have been added",
                statusCode: 404
            });
        }

        return sendResponse(res, products, 200);

    } catch (err) {
        return sendErrorResponse(res, {
            message: err.message,
            statusCode: 500
        });
    }
};

const post_product_controller = (req, res) => {
    try {
        const product = req.body.product;

        const newproduct = post_product(product);

        return sendResponse(res, {
            message: "Product added successfully",
            product: newproduct
        }, 201);

    } catch (err) {
        return sendErrorResponse(res, {
            message: err.message,
            statusCode: 500
        });
    }
};

module.exports = {
    get_product_controller,
    get_all_product_controller,
    post_product_controller
};