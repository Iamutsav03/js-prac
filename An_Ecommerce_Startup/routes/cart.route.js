
const express = require('express');
const router = express.Router();

const { user_cart_details , add_product_user_cart } = require('../controllers/cart.controller');

router.get('/:id', user_cart_details);

router.post('/:id', add_product_user_cart);

module.exports = router;
