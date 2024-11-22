const Show = require('../models/showModel');
// const mongoose = require('mongoose');


const createShow = async (req, res) => {
  try {
    const { name, time, date, theaterId, movie, price, totalSeats } = req.body;

    // Log the request payload for debugging
    //console.log("Request payload:", );


    // Check if a show with the same name and time exists in the same theater
    const existingShow = await Show.findOne({ name, time, theater: theaterId, date });
    if (existingShow) {
      return res.status(400).json({ success: false, message: "Show already exists" });
    }

    // Create the new show
    const show = new Show({
      name,
      time,
      date,
      theater: theaterId,
      movie: movie,
      price,
      totalSeats
    });
   // console.log(' movie Show', show);
    await show.save();
    //console.log('Show created successfully:', show.movie);
    return res.status(201).json({ success: true, message: "Show created successfully", data: show });
  } catch (err) {
    //console.log("Error creating show:", err.message);
    return res.status(500).json({ success: false, message: "Cannot create show", error: err.message });
  }
};

const getAllShows = async (req,res) => {
  try{
    const shows = await Show.find()
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
    console.log("shows for theater", req.params.theaterId);
    const shows = await Show.find({ theater: req.params.theaterId }).populate(
      "movie"
    );
    console.log("shows", shows);
    res.send({
      success: true,
      data: shows,
      message: "Shows fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
}

const getAllTheatersByMovie = async (req,res) => {
  /**
   * it retireves all shows od the specified movie and date from the database
   * it then filters out unique theaters from the shows and organizes shows under each unique theater
   * A - [show1, show2, show3]
   * B - [show4, show5, show6]
   * C - [show7, show8, show9]
   * shows - [show1, show2, show3, show4, show5, show6, show7, show8, show9]
   * [A-[show1, show2], B-[show4 show6], C-[ show8, show9]]
   * */

  try {
    const { movieId, date } = req.params;
    console.log("movie", movieId, "date", date);
  
    const shows = await Show.find({ movie:movieId, date }).populate("theater");
    console.log("shows", shows);
    const uniquetheaters = [];
    shows.forEach((show) => {
      const istheater = uniquetheaters.findIndex(
        (theater) => theater._id === show.theater._id
      );
      console.log("istheater", istheater);
      if (istheater < 0) {
        const showsOfThistheater = shows.filter(
          (showObj) => showObj.theater._id === show.theater._id
        );
        uniquetheaters.push({
          ...show.theater._doc,
          shows: showsOfThistheater,
        });
      }
    });
    console.log("uniquetheaters", uniquetheaters);
    res.send({
      success: true,
      data: uniquetheaters,
      message: "Shows fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
}


const getShowById = async (req,res) => {
  try {
    const show = await Show.findById(req.params.showId)
      .populate("movie")
      .populate("theater");
    res.send({
      success: true,
      data: show,
      message: "Show fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
}

const updateShow = async (req,res) => {
  try {
    await Show.findByIdAndUpdate(req.body.showId, req.body);
    res.send({
      success: true,
      message: "Show has been updated",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
}

const deleteShow = async (req,res) => {
  try {
    await Show.findByIdAndDelete(req.params.showId);
    res.send({
      success: true,
      message: "Show has been deleted",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {createShow,getAllShows,getShowsByTheater,getAllTheatersByMovie,getShowById,updateShow,deleteShow}