const express = require('express');
const cors = require('cors');

const app = express()
const userRouter = require('./routes/userRoute')
const movieRouter = require('./routes/movieRoute')
const theaterRouter = require("./routes/theaterRoute")

require("dotenv").config();
const connectDB = require('./config/db')
connectDB();

app.use(cors());
app.use(express.json())

app.use('/api/users',userRouter)
app.use('/api/movies',movieRouter)
app.use("/api/theaters",theaterRouter)

app.listen(8081,() =>{
    console.log('Server is running on port 8081')
})