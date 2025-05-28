const mongoose = require("mongoose");

const userSchema = mongoose.Schema({


    name: {
        type: String,
        required: true,

    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,

       
    },
    role: {
        type: String,
        enum: ['user', "creator"],
        required: true,
        default: "user"
    }

}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;