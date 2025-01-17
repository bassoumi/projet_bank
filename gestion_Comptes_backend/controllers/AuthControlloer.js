const jwt = require('jsonwebtoken');
const User = require('../models/User')

const SECRET_KEY ='_clé_secrète'

const login = async (req,res)=>{
    const {username,password} =req.body;

    try{

        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({message:"invalid username or password"});
        }
        if(user.password !== password) {
            return res.status(401).json({message:'invalide username or password'})
        }
        const token = jwt.sign({userId:user._id,username:user.username},SECRET_KEY,{expiresIn:"5h"});
        return res.status(200).json({message:"login successful",token})

    }catch(error){
        res.status(500).json({message: 'Invalid credentials',error})
    }
}

module.exports={login}