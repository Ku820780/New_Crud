const express = require('express')
const { user_post, user_login, user_get } = require('../Controller/userController')
const router = express.Router()

router.post('/register', user_post)
router.post('/login', user_login)
router.get('/get', user_get)

module.exports = router