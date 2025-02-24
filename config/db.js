const mongoose = require('mongoose');

const connectdb = async () => {

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("db connected")

    } catch (err) {

        console.log("db error : ", err)
    }
}
module.exports = connectdb;