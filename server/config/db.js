const mongoose = require('mongoose');

const dbURL = process.env.DB_Url

const connectDB = async() => {
  try{
    await mongoose.connect(dbURL)
    console.log('Connected to DB')
  }catch(err){
    console.error(err.message)
  }

}

module.exports = connectDB