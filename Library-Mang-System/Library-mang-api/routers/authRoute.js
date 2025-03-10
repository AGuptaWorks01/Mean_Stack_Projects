const express = require('express')
const { register, login } = require('../Controller/authController.js')

const router = express.Router();

router.post('/register', register)

router.post('/login', login)

module.exports = router;