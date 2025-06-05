const jobModel = require("../model/jobModel")

const getAdmin=async(req,res)=>{
try {
    const jobdata = await jobModel.find();

    res.send({ data: jobdata, message: "data fetched succssfully", success: true });

  } catch (err) {
    console.error("job single post get Error:", err);
    return res.status(500).json({ success: false, message: "Server error", data: null });
  }



}
const acceptJob = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedJob = await jobModel.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ data: updatedJob, message: "Job verified successfully", success: true });
  } catch (err) {
    console.error("Job verify error:", err);
    return res.status(500).json({ success: false, message: "Server error", data: null });
  }
};



module.exports = {getAdmin,acceptJob}