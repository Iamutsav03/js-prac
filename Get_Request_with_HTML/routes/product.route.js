const express = require('express');
const router = express.Router();

const get_all_products = require('../controllers/product.controller');

router.get('/', get_all_products);

module.exports = router;

