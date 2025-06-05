const express =require("express");
const { } = require("../controller/postController");
const authorization = require('../middleware/authorization');
const { getAdmin, acceptJob } = require("../controller/adminController");
const authorizationadmin = require("../middleware/authorizationAdmin");
const adminRouter = express.Router();
adminRouter.get('/get',authorizationadmin,getAdmin);
adminRouter.put('/verify/:id',authorizationadmin,acceptJob);
module.exports = adminRouter;