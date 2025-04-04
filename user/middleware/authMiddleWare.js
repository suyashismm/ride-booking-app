const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')


module.exports.userAuth = async (req,res,next) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split('')[1];

        if(!token) {
            return res.status(401).json({message:'Unauthorised'})
        }

        const isBlacklisted = await isBlacklisted.find({token});
        
        if(isBlacklisted.length){
            return res.status(401).json({message:'Unauthorized'})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id)

        if(!user) {
            return res.status(401).json({mesasge:'Unautorised'})
        }

        req.user = user;

        next();
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}