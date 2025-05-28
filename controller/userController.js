const userModel = require("../model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const admin = require('../config/firebaseAdmin')

const signUpUser = async (req, res) => {
    try {
        const { name, number, role, verifyId } = req.body;

        if (!name || !number || !role || !verifyId) {
            return res.status(400).json({ success: false, message: "All fields are required", data: null });
        }

        // This verifyId is the Firebase ID Token, not the verificationId
        const decodedToken = await admin.auth().verifyIdToken(verifyId);

        if (!decodedToken || decodedToken.phone_number !== `+91${number}`) {
            return res.status(400).json({ success: false, message: "OTP verification failed", data: null });
        }
        const numbers = `+91${number}`
        const newUser = new userModel({ name, number:numbers, role });
        await newUser.save();

        const token = jwt.sign({ number }, process.env.SECRET_KEY, { expiresIn: '30d' });
        res.cookie("authToken", token, {
            maxAge: 2592000000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return res.status(201).json({ success: true, message: "User created successfully", data: {role:role} });

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ success: false, message: "Server error", data: null });
    }
};

const login = async (req, res) => {

let phone = req.body.phone;
phone= `+91${phone}`
    console.log("working tilldsf00000000000000000000000000 here");
    try {
   

        const userdata = await userModel.findOne({ number: phone });
console.log(userdata)
   

        if (userdata) {
            const token = jwt.sign({ phone }, process.env.SECRET_KEY, { expiresIn: '30d' })
            res.cookie("authToken", token, { maxAge: 2592000000, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", });
            return res.status(201).json({ success: true, message: "Logged In successfully", data: "token send" });
        } else {
            return res.status(500).json({ success: false, message: "No user found", data: null });
        }

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ success: false, message: "Server error", data: null });
    }
}

const otpgenerater = async (req, res) => {

    const body = req.body;
    const indianNumber = "+919145043400"
    console.log(indianNumber);
    if (!body.phone) {
        return res.status(400).json({ success: false, message: "Phone number is required" });
    }
    try {
        // Generate an OTP via Firebase Authentication
        const sessionInfo = await admin.auth().createSessionCookie(indianNumber, { expiresIn: 5 * 60 * 1000 });

        res.status(200).json({ success: true, sessionInfo });

    } catch (err) {
        console.error("OTP sending failed:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }

}
const verifyotp = async (req, res) => {
    const { otp, verifyId } = req.body;

    console.log("Received verifyId:", verifyId);

    try {
        if (!otp || !verifyId) {
            return res.status(400).json({ success: false, message: "OTP and sessionToken are required" });
        }

        // verifyId is now the Firebase ID token from frontend
        const decodedToken = await admin.auth().verifyIdToken(verifyId);

        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Invalid OTP or session expired" });
        }

        return res.status(200).json({ success: true, message: "OTP verified successfully", user: decodedToken });
    } catch (err) {
        console.error("OTP verification failed:", err);
        res.status(500).json({ success: false, message: "Server error during OTP verification" });
    }
};

const verifyotplogin = async (req, res) => {
    const { otp2, verifyId2 } = req.body;

    console.log("Received verifyId:", verifyId2);

    try {
        if (!otp2 || !verifyId2) {
            return res.status(400).json({ success: false, message: "OTP and sessionToken are required" });
        }

        // verifyId is now the Firebase ID token from frontend
        const decodedToken = await admin.auth().verifyIdToken(verifyId2);

        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Invalid OTP or session expired" });
        }
        

        return res.status(200).json({ success: true, message: "OTP verified successfully", user: decodedToken });
    } catch (err) {
        console.error("OTP verification failed:", err);
        res.status(500).json({ success: false, message: "Server error during OTP verification" });
    }
};


module.exports = { signUpUser, login, otpgenerater, verifyotp ,verifyotplogin};
