const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const authMiddleWare = require('../middleware/authMiddleWare')


routes.post('/register',userController.register)
routes.post('/login',userController.login)
routes.get('/logout',userController.logout)
routes.get('/profile',authMiddleWare.userAuth,userController.profile)

module.exports = router 

