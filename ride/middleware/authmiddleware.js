const jwt = require('jsonwebtoken')
const axios = require('axios')
const rideModel = require('../models/ride.model')

module.exports.userAuth = async (req,res,next) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({message:'Unauthorised'})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        console.log("tokennnnnnnnnnnn",token)
        const response = await axios.get(`http://localhost:3000/user/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user = response.data;
        console.log("user data--------------",user)
        if(!user) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        req.user = user;

        next();
    }
    catch(error){
        console.log("error in ridee middleware--=================")
        return res.status(500).json({message:error.message})
    }
}