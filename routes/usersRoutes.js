const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/login', userController.login)
router.post('/signin', userController.signIn)
router.post('/register', userController.register)

module.exports = router
