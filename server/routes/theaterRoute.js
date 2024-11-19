const express = require('express');

const theaterRoute = express.Router();

const { createTheater, getAllTheatersForAdmin, updateTheater, deleteTheater,getAllTheaters } = require('../controllers/theaterController');


theaterRoute.post("/addTheater", createTheater)
theaterRoute.get("/getTheaters", getAllTheatersForAdmin)
theaterRoute.put("/updateTheater/:theaterId", updateTheater)
theaterRoute.delete("/deleteTheater/:theaterId", deleteTheater)
theaterRoute.get("/get-all-theaters-by-owner/:ownerId", getAllTheaters)



module.exports = theaterRoute;
