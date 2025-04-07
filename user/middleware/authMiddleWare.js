const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const blacklisttokenModel = require('../models/blacklisttoken.model')
require('dotenv').config()

module.exports.userAuth = async (req,res,next) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({message:'Unauthorised'})
        }

        const isBlacklisted = await blacklisttokenModel.find({token});
        if(isBlacklisted.length){
            return res.status(401).json({message:'Unauthorized'})
        }

        console.log("uptill here code executed",token)
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log("decodedddddddddddddddddd",decoded)
        const user = await userModel.findById(decoded.id)

        if(!user) {
            return res.status(401).json({mesasge:'Unauthorized'})
        }

        req.user = user;

        next();
    }
    catch(error){
        console.log("errrro imn userrrrrrrrrrrrrrrrr",error)
        return res.status(500).json({message:error.message})
    }
}