const mongoose = require("mongoose")

const theaterSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
  },
  isActive:{
    type:Boolean,
    default:false,
    required:true
  }
},{
  timestamps:true
})

const theaters =  mongoose.model("theaters",theaterSchema)
module.exports = theaters