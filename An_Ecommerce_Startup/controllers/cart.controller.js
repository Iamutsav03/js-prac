
const { users, products, cart } = require("../data");

const {
    sendErrorResponse,
    sendResponse
} = require("../utils/response");

const user_cart_details = (req, res) => {
    const user_id = Number(req.params.id);

    const user = users.find((u) => u.id === user_id);

    if (!user) {
        return sendErrorResponse(res, {
            message: "User not found",
            statusCode: 404
        });
    }

    const userCart = cart.filter((u) => u.user_id === user_id);

    if (userCart.length === 0) {
        return sendResponse(res, null, {
            message: "Cart is empty",
            statusCode: 200
        });
    }

    return sendResponse(res, userCart, {
        message: "Cart details fetched successfully",
        statusCode: 200
    });
};


const add_product_user_cart = (req, res) => {
    const user_id = Number(req.params.id);
    const product_id = Number(req.body.product_id);

    const user = users.find((u) => u.id === user_id);

    if (!user) {
        return sendErrorResponse(res, {
            message: "User not found",
            statusCode: 404
        });
    }

    const product = products.find((p) => p.id === product_id);

    if (!product) {
        return sendErrorResponse(res, {
            message: "Product not found",
            statusCode: 404
        });
    }

    const newItem = {
        user_id: user_id,
        product_id: product.id,
        product: product.product
    };

    cart.push(newItem);

    return sendResponse(res, newItem, {
        message: "Product added to cart successfully",
        statusCode: 201
    });
};


module.exports = {
    user_cart_details,
    add_product_user_cart
};
