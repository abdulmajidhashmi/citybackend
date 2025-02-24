const userModel = require("../model/userModel");
const bcrypt  =require('bcryptjs');
const jwt =require('jsonwebtoken');
const cookie  =require('cookie-parser');

const signUpUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: "All fields are required", data: null });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match", data: null });
        }
      const hashed_password =  await bcrypt.hash(password,8);

        const newUser = new userModel({
            name,
            email,
            password : hashed_password
        });

        await newUser.save();

       const token = jwt.sign({email},process.env.SECRET_KEY,{expiresIn:'30d'})
       res.cookie("authToken",token,{maxAge:2592000000,httpOnly:true,secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/",});

        return res.status(201).json({ success: true, message: "User created successfully", data: "token send" });
    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ success: false, message: "Server error", data: null });
    }
};

const login = async (req, res) => {

const {email,password} = req.body;
    try {

       const userdata =  await userModel.findOne({email:email});

       const verify = await bcrypt.compare(password,userdata.password);

       if(verify)
       {
        const token = jwt.sign({email},process.env.SECRET_KEY,{expiresIn:'30d'})
        res.cookie("authToken",token,{maxAge:2592000000,httpOnly:true,secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/",});
        return res.status(201).json({ success: true, message: "Logged In successfully", data: "token send" });
       }else{
        return res.status(500).json({ success: false, message: "No user found", data: null });
       }
       
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ success: false, message: "Server error", data: null });
    }
}

module.exports = { signUpUser, login };
