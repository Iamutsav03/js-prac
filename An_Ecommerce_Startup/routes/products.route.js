const express = require('express');
const router = express.Router();

const { get_all_product, get_product, post_product } = require('../controllers/product.controller');


router.get('/', get_all_product);
router.get('/:id', get_product);
router.post('/', post_product);

module.exports = router;