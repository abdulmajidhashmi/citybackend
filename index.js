const express = require("express");
const app = express();
require('dotenv').config();
const connectdb = require('./config/db');
const userRouter = require("./route/userRoute");
const cookie = require('cookie-parser');
connectdb();


const cors = require('cors');
const postRouter = require("./route/postRouter");
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());


app.use(cookie());

const PORT =process.env.PORT;
app.use('/api/user',userRouter);
app.use('/api/post',postRouter);
app.get('/api',(req,res)=>{

    res.send("server in running");
})
app.listen(PORT,()=>{
console.log(`server is running on http://localhost:${PORT}`);
})


