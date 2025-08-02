const mongoose= require("mongoose")
const project = require("../models/project")
const ProjectUser = require("../models/ProjectUser") 
const DevOpsInfo = require("../models/DevOpsInfo")

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


const deleteDevopsProject = async (req, res) => {
  try {
    const { projectId, userId } = req.query;

    // Validate inputs
    if (!projectId || !userId) {
      return res.status(400).json({ 
        success: false,
        message: "Both projectId and userId are required" 
      });
    }

    // Check if project exists and belongs to this devops user
    const proj = await project.findOneAndDelete({ 
      _id: projectId, 
      devops: userId 
    });

    if (!proj)  {
      return res.status(404).json({
        success: false,
        message: "Project not found or you don't have permission to delete it"
      });
    }

    // Optional: Clean up related data
  
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    
    });

  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message
    });
  }
};

const getDevopsProjectPentesters = async(req , res)=>{

  const {projectId } = req.query
  console.log("userid for devops project : " , projectId   )
  const projectPentesters = await ProjectUser.find({project:projectId}).populate("pentester", "_id firstName lastName profileImageUrl")
  console.log("devOps project s: " , projectPentesters.length)
  res.status(200).json({  projectPentesters })



}
const registerDevOpsInfo = async (req, res) => {
  
  await DevOpsInfo.syncIndexes();

  
  try {
    if (!req.body || !req.body.data) {
      return res.status(400).json({
        success: false,
        error: "Request body is required"
      });
    }

    const {
      projectId,
      pentesterId,
      platformType,            // 'web' | 'mobile' | 'desktop'
      platformData,
      endpoints,
      submittedBy,
      isShared = false,
      technologyStack
    } = req.body.data;

    // ✅ validate required shared fields
    if (!projectId || !platformType || !submittedBy || !endpoints) {
      return res.status(400).json({
        success: false,
        error: "projectId, platformType, endpoints and submittedBy are required"
      });
    }

    // ✅ if not shared, pentesterId is required
    if (!isShared && !pentesterId) {
      return res.status(400).json({
        success: false,
        error: "pentesterId is required for non-shared DevOps entries"
      });
    }

    // ✅ extract environmentType only for web platform
    const envType = platformData?.web?.environmentType;
    if (!envType) {
      return res.status(400).json({
        success: false,
        error: "platformData.web.environmentType is required"
      });
    }

    // ✅ Build DevOps document to save
    const devOpsData = {
      project: projectId,
      pentester: isShared ? undefined : pentesterId,
      platform: platformType,
      platformData: {
        [platformType]: {
          ...platformData?.[platformType]
        }
      },
      endpoints,
      submittedBy,
      isShared: !!isShared
    };

    // ✅ Optionally attach technologyStack if present
    if (technologyStack) {
      devOpsData.technologyStack = technologyStack;
    }

    const newDevOpsInfo = new DevOpsInfo(devOpsData);
    const savedDevOpsInfo = await newDevOpsInfo.save();

    return res.status(201).json({
      success: true,
      message: "DevOpsInfo saved successfully",
      data: savedDevOpsInfo
    });

  } catch (error) {
    console.error("Error saving DevOpsInfo:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message
    });
  }
};


const getDevOpsInfo = async(req , res)=>{

  const {projectId , userId } = req.query 

  let result = await DevOpsInfo.findOne({project:projectId  })

  if(!result.isShared){
    result = await DevOpsInfo.findOne({project:projectId , pentester : userId   })
    console.log("result in if : " , result )
  }
  console.log("result in line 236 : " ,result.isShared )
  res.status(200).json(result)


}


module.exports = {
getDevopsProjects , 
getDevopsProject, 
updateDevopsProject, 
deleteDevopsProject, 
getDevopsProjectPentesters ,
registerDevOpsInfo , 

getDevOpsInfo

}