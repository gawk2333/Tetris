const express = require('express')
const router = express.Router()
const { userRegister, userLogin, userTokenLogin } = require('../controller/auth')

router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/token', userTokenLogin)

module.exports = router
