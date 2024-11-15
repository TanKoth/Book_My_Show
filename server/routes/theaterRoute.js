const express = require('express');

const theaterRoute = express.Router();

const { createTheater, getAllTheaters, updateTheater, deleteTheater } = require('../controllers/theaterController');


theaterRoute.post("/addTheater", createTheater)
theaterRoute.get("/getTheaters", getAllTheaters)
theaterRoute.put("/updateTheater/:theaterId", updateTheater)
theaterRoute.delete("/deleteTheater/:theaterId", deleteTheater)


module.exports = theaterRoute;
