const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const EmailHelper = require('../utils/emailHelper');

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

const otpGenerator = function () {
  return Math.floor(100000 + Math.random() * 900000); // ranger from 100000 to 999999
};

const forgetPassword = async (req, res) => {
  try {
    if (req.body.email === undefined) {
      return res
        .status(401)
        .json({ success: false, message: "Email is required" });
    }
    const user = await userModel.findOne({ email: req.body.email });
    if (user == null) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const otp = otpGenerator(); // 123456
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();
    await EmailHelper("otp.html", user.email, { name: user.name, otp: otp });
    res
      .status(200)
      .json({ success: true, message: "OTP sent to your email",data:user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

const resetPassword = async (req, res) => {
  try {
    const resetDetails = req.body;
    if (!req.params.email || !resetDetails.otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }
    const user = await userModel.findOne({ email: req.params.email });
    if (user == null) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // if otp is expired
    if (Date.now() > user.otpExpiry) {
      return res
        .status(401)
        .json({ success: false, message: "OTP has expired"});
    }
    user.password = resetDetails.password;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successful",data:user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { createUser, userLogin, getCurrentUser, forgetPassword, resetPassword };