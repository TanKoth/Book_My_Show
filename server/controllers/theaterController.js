const Theater = require("../models/theaterModel")


 const createTheater = async(req,res) =>{
  try{
    const theater = new Theater(req.body)
    await theater.save()
    res.status(200).json({success:true, message:"Theater created successfully", data:theater})
  }catch(err){
    return res.status(500).json({success:false,message:"Cannot create theater"})
  }

 }


 const getAllTheaters =async (re,res) => {
  try{
    const allTheaters = await Theater.find()
    if(!allTheaters){
      return res.status(400).json({success:false,message:"Cannot find theater data"})
    }else{
      return res.status(200).json({success:true,message:"All theaters fetched successfully", data:allTheaters})
    }
  }catch(err){
    return res.status(500).json({success:false,message:err.message})
  }
 }

 const updateTheater = async(req,res) =>{
  try{
    const updateTheater = await Theater.findByIdandUpdate(req.params.theaterId, req.body)
    if(!updateTheater){
      return res.status(400).json({success:false,message:"Cannot update theater data"})
    }else{
      return res.status(200).json({success:true,message:"Theater updated successfully",data:updateTheater})
    }
  }catch(err){
    return res.status(500).json({success:false,message:err.message})
  }
 }

 const deleteTheater = async (req,res) =>{
  try{
    const deleteTheater = await Theater.findByIdandDelete(req.params.theaterId)
    if(!deleteTheater){
      return res.status(400).json({success:false,message:"Cannot delete theater data"})
    }else{
      return res.status(200).json({success:true,message:"Theater deleted successfully",data:deleteTheater})
    }
  }catch(err){
    return res.status(500).json({success:false,message:err.message})
  }
 }

 module.exports = {createTheater,getAllTheaters,updateTheater,deleteTheater}