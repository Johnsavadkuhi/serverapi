const project = require("../models/project");
const ProjectUser = require("../models/ProjectUser");
const User  = require("../models/User")
const WebOwasp = require("../config/owasp_wstg_data")

const getUsers = async (req , res)=>{
  
  const users = await User.find({}) 
   res.status(200).json({users})

}


// تابع بازگشتی تبدیل به قالب BugSchema
function convertToBugSchemaFormat(node) {
  const { id, label, labelfa, wstg, children = [] } = node;

  return {
    id,
    label,
    labelfa,
    wstg: wstg || null,
    status: 'notAttempted',
    children: children.map(convertToBugSchemaFormat)
  };
}
const assignUser = async (req, res) => {
  try {
    // userId is id of manager and it should be set to manager in datbase 
    const {projectId ,pentesterId , userId , version } = req.body 


    if (!projectId || !pentesterId || !userId  || !version) {
      return res.status(400).json({ message: "Missing required fields." });
    }

        const bugScopes = WebOwasp.map(convertToBugSchemaFormat);

    // Create or update the project-user relation
    const projectUser = await ProjectUser.findOneAndUpdate(
      { project: projectId, pentester: pentesterId },
      { manager: userId ,bugScopes,  version },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Add relation to both Project and User (if not already there)
    await Promise.all([
      project.findByIdAndUpdate(projectId, {
        $addToSet: { userProject: projectUser._id },
      }),
      User.findByIdAndUpdate(pentesterId, {
        $addToSet: { userProject: projectUser._id },
      }),
    ]);

    return res.status(200).json({ message: "Pentester assigned successfully." });

  } catch (error) {
    console.error("Error assigning pentester:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


const getAssignedUsers = async (req, res) => {

  const { projectId, userId } = req.query;
  try {

    
      const response = await ProjectUser.find({ project: projectId });
      const pentesters = response.map(item => item.pentester);

      console.log("response : "  , pentesters )
      res.status(200).json({pentesters});

  } catch (err) {
      res.status(500).send(err.message || []);
  }

}

const rmUserAssigned = async (req, res) => {


  const { projectId, pentesterId } = req.body

  console.log("project Id : " , projectId , pentesterId)

  try {

      // , version:req.body.version 
      const result = await ProjectUser.findOneAndDelete({
          project: projectId, pentester: pentesterId
      })



      await project.findByIdAndUpdate(projectId, {
          $pull: { userProject: result._id },
      });
      await User.findByIdAndUpdate(pentesterId, {
          $pull: { userProject: result._id },
      });

      res.status(200).json("delted")

  } catch (err) {
      console.log(err)
      res.status(500).json(err)

  }



}

const getBugScopes  = async(req , res)=>{

  const {projectId , userId , managerId } = req.query 
  console.log("proejct id : "  , projectId , userId , managerId)
   try {
    const projectUser = await ProjectUser.findOne({
      project: projectId,  
      pentester: userId  
    });

    console.log("projectUser : " , projectUser )
    if (!projectUser) {
      return res.status(404).json({ message: "ProjectUser not found." });
    }

    return res.json({ bugScopes: projectUser.bugScopes });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}


module.exports = {
getUsers , assignUser , getAssignedUsers , rmUserAssigned , getBugScopes
  };
  