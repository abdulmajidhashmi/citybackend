const express =require("express");
const { jobpost, jobpostget } = require("../controller/postController");
const postRouter = express.Router();
postRouter.post('/job',jobpost);
postRouter.get('/job',jobpostget);
module.exports = postRouter;