const express = require('express');
const router = express.Router();

const { get_all_users, get_user, post_user } = require('../controllers/user.controller');

router.get('/', get_all_users);
router.get('/:id', get_user);
router.post('/', post_user);

module.exports = router;
