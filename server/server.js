const express = require('express');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const helmet = require("helmet")
const mongooseSanitize = require('express-mongo-sanitize');

const app = express()
const userRouter = require('./routes/userRoute')
const movieRouter = require('./routes/movieRoute')
const theaterRouter = require("./routes/theaterRoute")
const showRouter = require("./routes/showRoute")
const bookingRouter = require("./routes/bookingRoute")


require("dotenv").config();
const connectDB = require('./config/db')
connectDB();

app.use(cors());
app.use(express.json())
const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "You have exceeded the 100 requests in 15 minutes limit!",
})

app.use("/api/",limiter)
app.use(helmet())
app.use(mongooseSanitize())
app.use('/api/users',userRouter)
app.use('/api/movies',movieRouter)
app.use("/api/theaters",theaterRouter)
app.use("/api/shows",showRouter)
app.use("/api/bookings",bookingRouter)

app.listen(8081,() =>{
    console.log('Server is running on port 8081')
})