const express = require('express');
const router = express.Router();

const {
    get_all_products,
    post_product,
    show_products
} = require('../controllers/product.controller');

router.get('/', get_all_products);

router.post('/', post_product);

router.get('/all', show_products);

module.exports = router;