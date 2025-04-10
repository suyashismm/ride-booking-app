const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const authMiddleWare = require('../middleware/authmiddleware')


router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/logout',userController.logout)
router.get('/profile',authMiddleWare.userAuth,userController.profile)

module.exports = router 

