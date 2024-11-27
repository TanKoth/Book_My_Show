const bookingModel = require('../models/bookingModel');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const showModel = require('../models/showModel');
const movieTicketEmail = require('../utils/movieTicketEmail');

const makePayment = async (req,res) =>{

  try {
    const { token, amount } = req.body;
    if (!token || !token.email || !token.id) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    console.log('customer',customer.email)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Movie Ticket Booking",
      confirm: true,
    });

    const transactionId = paymentIntent.id;
    res.send({
      success: true,
      message: "Payment Successful",
      data: transactionId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

const bookShow = async (req,res) => {
  try{
    const newBooking = new bookingModel(req.body);
    await newBooking.save();
    const show = await showModel.findById(req.body.show).populate('movie');
    const updatedBookedSeats = [...show.bookedSeats,...req.body.seats];
    await showModel.findByIdAndUpdate(req.body.show,{bookedSeats:updatedBookedSeats},{new:true})
    return res.status(200).json({success:true,message:"Booking successful",data:newBooking}) 
  }catch(err){
    return res.status(500).json({success:false,message:err.message})
  }
}

const getAllBookings = async (req,res) =>{
  try{
    const bookings = await bookingModel.find({user:req.params.userId}).populate("show").populate("user").populate({
      path:"show",
      populate:{
        path:"movie",
        model:"movies"
      }
    }).populate({
      path:"show",
      populate:{
        path:"theater",
        model:"theaters"
      }
    });
    console.log('Confirm bookings: ',bookings);
    if (bookings.length === 0) {
      return res.status(400).json({ success: false, message: "No bookings found" });
    }

    // Log the bookings array for debugging
    console.log("Bookings:", bookings);

    // Use the most recent booking to send the email
    const recentBooking = bookings[bookings.length - 1];

    await movieTicketEmail("ticketConfirm.html", recentBooking.user.email, {
      name: recentBooking.user.name,
      movie: recentBooking.show.movie.name,
      theater: recentBooking.show.theater.name,
      date: recentBooking.show.date,
      time: recentBooking.show.time,
      seats: recentBooking.seats,
      amount: recentBooking.seats.length * recentBooking.show.price,
      transactionId: recentBooking.transactionId
    });
    return res.status(200).json({success:true,message:"All bookings fetched successfully",data:bookings})
  }catch(err){
    return res.status(500).json({success:false,message:err.message})
  }
} 

module.exports = {makePayment,bookShow,getAllBookings}