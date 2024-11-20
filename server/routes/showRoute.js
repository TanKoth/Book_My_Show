const express = require("express")
const showRoute = express.Router()

const{createShow,getAllShows,getShowsByTheater,getAllTheatersByMovie,getShowById,updateShow,deleteShow} = require("../controllers/showController")

showRoute.post("/addShow",createShow)
showRoute.get("/getAllShows",getAllShows)
showRoute.get("/getShowsByTheater/:theaterId",getShowsByTheater)
showRoute.get("/getAllTheatersByMovie/:movie/:date",getAllTheatersByMovie)
showRoute.get("/getShowById/:showId",getShowById)
showRoute.put("/updateShow/:showId",updateShow)
showRoute.delete("/deleteShow/:showId",deleteShow)

module.exports = showRoute