const express = require('express');
const router = express.Router();

const {addUser , getUser , deleteUser , updateUser} = require('../controller/user.controller');

router.post('/add',addUser);
router.get('/',getUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports = router;