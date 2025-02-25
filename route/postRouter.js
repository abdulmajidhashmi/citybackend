const express =require("express");
const { jobpost, jobpostget, jobpostlimitget, jobpostviewsingle } = require("../controller/postController");
const postRouter = express.Router();
postRouter.post('/job',jobpost);
postRouter.get('/job',jobpostget);
postRouter.get('/job/:id',jobpostviewsingle);
postRouter.get('/joblimit',jobpostlimitget);
module.exports = postRouter;