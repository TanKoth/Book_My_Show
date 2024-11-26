const express = require('express');

const bookingRoute = express.Router();

const {makePayment,bookShow,getAllBookings} = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

bookingRoute.post("/makePayment",auth,makePayment);
bookingRoute.post("/bookShow",auth,bookShow);
bookingRoute.get("/getAllBookings/:userId",auth,getAllBookings);


module.exports = bookingRoute;