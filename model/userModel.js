const mongoose = require("mongoose");

const userSchema = mongoose.Schema({


   
    number: {
        type: String,
        required: true,
        unique: true
    },
    role:{

        type:String
    }
   
   
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;