const jobModel = require("../model/jobModel");


const jobpost = async (req, res) => {


    const tokenPhoneNumber = req.user.phone;


    
  const { type, jobType, companyName, category, description, minSalary, maxSalary, location, title, experience, requirement } = req.body
  try {


        

    const verified=false;
    const jobdata = await new jobModel({
      tokenPhoneNumber,
      type, jobType, companyName, category, description, minSalary, maxSalary, location, title, experience, requirement,verified
    })
    jobdata.save();

    res.send({ success: true, message: "post created successfully", data: null });

  } catch (err) {
    console.error("job post Error:", err);
    return res.status(500).json({ success: false, message: "Server error", data: null });
  }
}

const jobpostget = async (req, res) => {
  try {
    const jobdata = await jobModel.find({verified:"true"}).sort({ createdAt: -1 });

    res.send({ data: jobdata, message: "data fetched succssfully", success: true });

  } catch (err) {
    console.error("job post get Error:", err);
    return res.status(500).json({ success: false, message: "Server error", data: null });
  }
}

const jobpostlimitget = async (req, res) => {
  try {
    const jobdata = await jobModel.find({verified:"true"}).sort({ createdAt: -1 }).limit(6);

    res.send({ data: jobdata, message: "data fetched succssfully", success: true });

  } catch (err) {
    console.error("job limit post get Error:", err);
    return res.status(500).json({ success: false, message: "Server error", data: null });
  }
}

const jobpostviewsingle = async (req, res) => {

  const id=req.params.id;
  try {
  const jobdata = await jobModel.findOne({ _id: id, verified: "true" });


    res.send({ data: jobdata, message: "data fetched succssfully", success: true });

  } catch (err) {
    console.error("job single post get Error:", err);
    return res.status(500).json({ success: false, message: "Server error", data: null });
  }
}
module.exports = { jobpost, jobpostget, jobpostlimitget ,jobpostviewsingle};