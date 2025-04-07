const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middleware/authmiddleware')
const rideController = require('../controllers/ride.controller')

router.post('/create-ride',authMiddleWare.userAuth,rideController.createRide)

module.exports = router 

