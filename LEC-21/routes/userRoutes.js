const express = require('express');
const router = express.Router();
const { getUserLogin, postAddUser } = require('../controller/userController');
router.get('/login', getUserLogin);
router.post('/register', postAddUser);
module.exports = router;