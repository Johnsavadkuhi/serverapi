const project = require("../models/project")
const ProjectUser = require("../models/ProjectUser")

const getUserProjects = async (req , res)=>{

  const userId  = req.query.userId 
  console.log("userId : " , userId )  
  const userProjects = await ProjectUser.find({pentester:userId}) 
   res.status(200).json({"projects":userProjects})

}

const getManagerProjects = async(req , res )=>{

  const userId  = req.query.userId 
  console.log("userId : " , userId )  
  const managerProjects = await project.find({projectManager:userId}).sort({_id:-1}) 
    console.log("manager Projects : "  , managerProjects.length)
   res.status(200).json({"projects":managerProjects})


}



module.exports = {
    getUserProjects , 
    getManagerProjects 
  };
  