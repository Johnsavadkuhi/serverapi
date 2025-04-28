const project = require("../models/project")

const getUserProjects = async (req , res)=>{

}

const getManagerProjects = async(req , res )=>{

    const managerProjects = await project.find({}) 
    console.log("manager Projects : "  , managerProjects.length)
   res.status(200).json({"projects":managerProjects})


}



module.exports = {
    getUserProjects , 
    getManagerProjects 
  };
  