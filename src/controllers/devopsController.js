const mongoose= require("mongoose")
const project = require("../models/project")

const getDevopsProjects = async (req , res  )=>{

  const userId = req.query.userId
  console.log("userid for devops project : " , userId )
  const devOpsProjects = await project.find({ devops: userId }).sort({ _id: -1 })
  res.status(200).json({  devOpsProjects })


}

const getDevopsProject = async (req , res  )=>{

  const {projectId , userId} = req.query
  console.log("userid for devops project : " , projectId , userId  )
  const devOpsProject = await project.findOne({_id:projectId ,  devops: userId }).sort({ _id: -1 })
  res.status(200).json({  devOpsProject })


}

const updateDevopsProject = async (req, res) => {
  try {
    const { projectId, userId, updatedData } = req.body;

    console.log("Updating project:", { projectId, userId, updatedData });

    // Validate required fields
    if (!projectId || !userId || !updatedData) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Update the project where both _id and devops match (ensures user owns the project)
    const result = await project.updateOne(
      { 
        _id: projectId, 
        devops: userId 
      },
      {
        $set: {
          projectName: updatedData.projectName,
          version: updatedData.version,
          letterNumber: updatedData.letterNumber,
          numberOfTest: updatedData.numberOfTest,
          projectType: updatedData.projectType,
          platform: updatedData.platform,
          // Add any other fields you want to update
          updatedAt: new Date() // Add timestamp for last update
        }
      }
    );

    // Check if the project was found and updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        message: "Project not found or you don't have permission to update it" 
      });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ 
        message: "No changes made to the project",
        projectId
      });
    }

    res.status(200).json({ 
      message: "Project updated successfully",
      projectId,
      updatedFields: Object.keys(updatedData)
    });

  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ 
      message: "Failed to update project",
      error: error.message 
    });
  }
};

module.exports = {
getDevopsProjects , 
getDevopsProject, 
updateDevopsProject

}