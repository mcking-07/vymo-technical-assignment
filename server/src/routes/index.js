const express = require('express');
const { login, signup, register, logout } = require('./controllers');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.post('/register', register);

router.get('/logout', logout);

module.exports = router;
