const express = require('express');
const router = express.Router();

const {postBus , get_busAvailable_Seat} = require('../controllers/bus.controller');

router.post('/' , postBus);
router.get('/:seat', get_busAvailable_Seat);

module.exports = router;