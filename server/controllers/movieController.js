const movieModel = require('../models/movieModel');

const createMovie = async(req,res) =>{
  try{
    const movie = new movieModel(req.body);
    await movie.save();
    return res.status(200).json({success:true,messsage:"Movie Created Successfully", data:movie})

  }catch(err){
    return res.status(500).json({success:false,message:err.message})
  }
}

const getAllMovies= async(req,res) =>{
  try{
    const allMovies = await movieModel.find();
    if(!allMovies){
      return res.status(400).json({success:false, message:"Cannot find movie data"})    
    }else{
      return res.status(200).json({success:true,message:"All movies fetched successfully",data:allMovies})
    }
  }catch(err){
    return res.status(400).json({success:false,message:err.message})
  }
}

const updateMovie = async(req,res) =>{
  try{
    const updateMovie = await movieModel.findByIdAndUpdate(req.params.movieId,req.body,{new:true})
      return res.status(200).json({success:true,message:"Movie updated successfully",data:updateMovie})
  }catch(err){
    return res.status(400).json({success:false,message:err.message})
  }
}

const deleteMovie = async (req,res) =>{
  try{
    const deleteMovie = await movieModel.findByIdAndDelete(req.params.movieId)
    if(!deleteMovie){
      return res.status(400).json({success:false,message:"Cannot delete movie data"})
    }else{
      return res.status(200).json({success:true,message:"Movie deleted successfully",data:deleteMovie})
    }
  }catch(err){
    return res.status(400).json({success:false,message:err.message})
  }
}

module.exports = {createMovie,getAllMovies,updateMovie,deleteMovie}