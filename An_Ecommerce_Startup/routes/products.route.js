const express = require('express');
const router = express.Router();

const { get_all_product_controller ,get_product_controller ,post_product_controller } = require('../controllers/product.controller');


router.get('/', get_all_product_controller);
router.get('/:id', get_product_controller);
router.post('/', post_product_controller);

module.exports = router;