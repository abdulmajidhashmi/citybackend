const express =require("express");
const userRouter = express.Router();
const { signUpUser, login } = require("../controller/userController");
userRouter.post('/signup',signUpUser);
userRouter.post('/login',login);

module.exports = userRouter;
