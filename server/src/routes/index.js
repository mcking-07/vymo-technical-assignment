const express = require('express');
const { auth } = require('../middleware/auth')
const { login, signup, register, logout } = require('./controllers');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.post('/register', auth, register);

router.put('/logout', auth, logout);

module.exports = router;
