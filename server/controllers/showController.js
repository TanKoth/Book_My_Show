const ShowModel = require('../models/showModel');
const mongoose = require('mongoose');

const createShow = async (req, res) => {
  try {
    const { name, time, date, theaterId, movieId, price, totalSeats } = req.body;

    // Check if a show with the same name and time exists in the same theater
    const existingShow = await ShowModel.findOne({ name, time, theater: theaterId, date });
    if (existingShow) {
      return res.status(400).json({ success: false, message: "Show already exists" });
    }

    // Create the new show
    const show = new ShowModel({
      name,
      time,
      date,
      theater: theaterId,
      movie: movieId,
      price,
      totalSeats
    });

    await show.save();
    console.log('Show', show);
    return res.status(201).json({ success: true, message: "Show created successfully", data: show });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Cannot create show", error: err.message });
  }

  // try{
  //   const show = new ShowModel(req.body)
  //   await show.save()
  //   return res.status(200).json({success:true,message:"Show created successfully",data:show})
  // }catch(err){
  //   return res.status(500).json({success:false,message:"Cannot create show"})
  // }
};

const getAllShows = async (req,res) => {
  try{
    const shows = await ShowModel.find()
    if(!shows){
      return res.status(400).json({success:false,message:"Cannot fetch shows"})
    }
    return res.status(200).json({success:true,message:"Shows fetched successfully",data:shows})
  }catch(err){
    return res.status(500).json({success:false,message:"Cannot fetch shows"})
  }
}

const getShowsByTheater = async (req,res) =>{
  try {
    const theaterId = req.params.theaterId;
    console.log("shows for theatre", theaterId);

    // Ensure the theaterId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(theaterId)) {
      return res.status(400).json({ success: false, message: "Invalid theater ID" });
    }

    const shows = await ShowModel.find({ theater: theaterId }).populate("movie");

    if (shows && shows.length === 0) {
      return res.status(404).json({success: true, message: "No shows found for this theater"});
    } 
    else if(shows && shows.length > 0){
      console.log("shows", shows);
      return res.status(200).json({
        success: true,
        data: shows,
        message: "Shows fetched successfully",
      });
    }
    else {
      return res.status(404).json({
        success: false,
        message: "No shows found for this theater",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Cannot fetch shows", error: err.message });
  }
}

const getAllTheatersByMovie = async (req,res) => {
  try{
    const{movie,date} = req.params
    const shows = await ShowModel.find({movie,date}).populate("theater")
    const uniqueTheaters =[]
    shows.forEach((show) =>{
      const isTheater = uniqueTheaters.filter((theater)=> theater._id === show.theater._id)
      if(isTheater){
        const showOfThisTheater = shows.filter((showObj) => showObj.theater._id === show.theater._id)
        uniqueTheaters.push({
          ...show.theater.doc,
          shows:showOfThisTheater
        })
      }
    })
    return res.status(200).json({success:true,message:"Theaters fetched successfully",data:uniqueTheaters})

  }catch(err){
    return res.status(500).json({success:false,message:"Cannot fetch theaters for movie"})
  }
}

const getShowById = async (req,res) => {
  try{
    const show = await ShowModel.findById(req.params.showId).populate("movie").populate("theater")
    if(!show){
      return res.status(400).json({success:false,message:"Cannot fetch show"})
    }
    return res.status(200).json({success:true,message:"Show fetched successfully",data:show})
  }catch(err){
    return res.status(500).json({success:false,message:"Cannot fetch show"})
  }
}

const updateShow = async (req,res) => {
  try{
    const show = await ShowModel.findByIdAndUpdate(req.params.showId,req.body,{new:true})
    if(!show){
      return res.status(400).json({success:false,message:"Cannot update show"})
    }
    return res.status(200).json({success:true,message:"Show updated successfully",data:show})
  }catch(err){
    return res.status(500).json({success:false,message:"Cannot update show"})
  }
}

const deleteShow = async (req,res) => {
  try{
    const show = await ShowModel.findByIdAndDelete(req.params.showId)
    if(!show){
      return res.status(400).json({success:false,message:"Cannot delete show"})
    }
    return res.status(200).json({success:true,message:"Show deleted successfully",data:show})
  }catch(err){
    return res.status(500).json({success:false,message:"Cannot delete show"})
  }
}

module.exports = {createShow,getAllShows,getShowsByTheater,getAllTheatersByMovie,getShowById,updateShow,deleteShow}