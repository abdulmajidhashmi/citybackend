const mongoose = require('mongoose');

const jobschema  =mongoose.Schema({

    type:{
        required:true,
        type:String,
    },
    category:{
        required:true,
        type:String,
    },
    title:{
        required:true,
        type:String,
    }, 
    jobType:{
        required:true,
        type:String,
    },
    location:{
        required:true,
        type:String,
    },
    experience:{
        required:true,
        type:String,
    },
    minSalary:{
        required:true,
        type:String,
    },
    maxSalary:{
        required:true,
        type:String,
    },
    requirement:{
        type:String,
    },
    description:{
        required:true,
        type:String,
    },
    companyName:{
        required:true,
        type:String
    }
},{timestamps:true})

const jobModel  =mongoose.model('post',jobschema);
module.exports =jobModel;