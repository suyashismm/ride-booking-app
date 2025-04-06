const captainModel = require('../models/captain.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        const captain = await captainModel.findOne({email})

        if(captain){
            return res.status(400).json({message:"captain already exists"})
        }

        const hash = await bcrypt.hash(password,10);
        const newCaptain = new captainModel({name,email,password})

        await newCaptain.save()

        const token = jwt.sign({id:newCaptain._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

        delete newCaptain._doc.password;
        res.cookie('token',token)

        res.send({message:'Captain registred successfully', token , newCaptain})
    }
    catch(error){
        console.error("Error",error)
        res.status(500).json({message:error.message})
    }
}


module.exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const captain = await captainModel.findOne({email}).select('+password');

        if(!captain){
            return res.status(400).json({message: "Captain not registered"})
        }

        const isMatch = await bcrypt.compare(password, captain.password)

        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }

        const token = jwt.sign({id:captain._id}, process.env.JWT_SECRET, {expiresIn:'1h'})

        delete captain._doc.password;

        res.cookie('token',token);

        res.send({message:'Captain logged in Successfully' , token, captain})
    }
    catch(error){
        console.error("Error",error)
        res.status(500).json({message:error.message})
    }
}


module.exports.logout = async (req,res) => {
    try{
        const token = req.cookies.token;
        await blacklisttokenModel.create({token})

        res.clearCookie('token')
        res.send({message:'Captain logged out successfully'})
    }
    catch(error){
        console.error("Error",error)
        res.status(500).json({message:error.message})
    }
}


module.exports.profile = async (req,res) => {
    try{
        res.send(req.captain);
    }
    catch(error){
        console.error("Error",error)
        res.status(500).json({message:error.message})
    }
}

