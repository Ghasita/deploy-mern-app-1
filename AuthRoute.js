const express = require('express');
const router = express.Router();
const { signup } = require('../Controllers/signup')
const { signupValidation, loginValidation } = require('../Middlewares/Authvalidation');
const { login } = require('../Controllers/login');
router.post('/login', loginValidation, login)
router.post('/signup', signupValidation, signup)
module.exports = router