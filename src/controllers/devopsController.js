const mongoose= require("mongoose")
const project = require("../models/project")

const getDevopsProjects = async (req , res  )=>{

  const userId = req.query.userId
  console.log("userid for devops project : " , userId )
  const devOpsProjects = await project.find({ devops: userId }).sort({ _id: -1 })
  res.status(200).json({  devOpsProjects })


}

module.exports = {
getDevopsProjects
}