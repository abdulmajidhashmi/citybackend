const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    
    number:{
        type:String,
        required:true,
        unique:true
    },
   otp:{
    required:true,
    type:Number
   }

},{timestamps:true});

const otpModel = mongoose.model('otp',otpSchema);

module.exports=otpModel;