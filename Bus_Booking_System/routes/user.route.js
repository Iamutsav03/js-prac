const express = require('express');
const router = express.Router();

const {postuser , get_allUser} = require('../controllers/user.controller');

router.post('/', postuser);
router.get('/', get_allUser);

module.exports = router;