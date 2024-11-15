const userModel = require('../models/UserModel');
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
  try {
    const userExists = await userModel.findOne({ email: req.body.email });
    
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
      
    } else {
      const user = new userModel(req.body);
      await user.save();
      res.status(200).json({ success: true, message: "User created Successfully" });
    }
  } catch (err) {
    console.log(err.message);
     return res.status(400).json({ success: false, message: err.message });
  }
};

const userLogin = async(req,res) => {
  try{
    const user = await userModel.findOne({email: req.body.email})
    if(!user){
      return res.status(400).json(({success:false,message:"User not found"}))
    }
    if(req.body.password !== user.password){
      return res.status(400).json({success:false, message:"Invalid password"})
    }else{
      const token = jwt.sign ({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
      console.log('Token:', token);
      return res.status(200).json({success:true, message:"User logged in successfully",data:token})
    }
  }catch(err){
    return res.status(400).json({success:false, message:err.message})
  }
}

const getCurrentUser = async (req, res) => {
  console.log('Header:', req.headers.authorization);
  try {
    const user = await userModel.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.send({ success: true, message: "You are Authorized", data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { createUser, userLogin, getCurrentUser };