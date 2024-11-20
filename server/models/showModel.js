const mongoose = require("mongoose")

const showSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  time:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  movie:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"movies",
  },
  theater:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"theaters",
  },
  totalSeats:{
    type:Number,
    required:true
  },
  bookedSeats:{
    type:Array,
    default:[]
  }

})

const Show = mongoose.model("shows", showSchema)
module.exports = Show