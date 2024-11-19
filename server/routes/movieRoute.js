const express = require('express');

const movieRoute = express.Router();

const {createMovie,getAllMovies,updateMovie,deleteMovie} = require('../controllers/movieController');

movieRoute.post("/addMovie",createMovie);
movieRoute.get("/getAllMovies",getAllMovies);
movieRoute.put("/updateMovie/:movieId",updateMovie);
movieRoute.delete("/deleteMovie/:movieId",deleteMovie);


module.exports = movieRoute;