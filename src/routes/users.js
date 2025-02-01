const express = require('express');
const { verifyToken, log } = require('../middlewares');
const { getUser, login, logout } = require('../resolvers/users');

const router = express.Router();

router.get('/user', verifyToken, log, getUser);
router.post('/login', log, login);
router.delete('/logout', log, logout);

module.exports = router;