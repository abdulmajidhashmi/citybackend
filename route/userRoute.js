const express =require("express");
const userRouter = express.Router();
const { signUpUser, login, otpgenerater, verifyotp, verifyotplogin } = require("../controller/userController");
userRouter.post('/signup',signUpUser);
userRouter.post('/login',login);
userRouter.post('/otp',otpgenerater);
userRouter.post('/verifyotp',verifyotp);
userRouter.post('/verifyotplogin',verifyotplogin);

module.exports = userRouter;
