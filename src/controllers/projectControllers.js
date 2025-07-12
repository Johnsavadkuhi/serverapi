const mongoose= require("mongoose")
const project = require("../models/project")
const ProjectUser = require("../models/ProjectUser")

const getUserProjects = async (req, res) => {

  const userId = req.query.userId
  const userProjects = await ProjectUser.find({ pentester: userId })
    .populate('project', 'projectName expireDay')
    .populate('manager', 'firstName , lastName').sort({ _id: -1 })
  res.status(200).json({ "projects": userProjects })

}

const getManagerProjects = async (req, res) => {

  const userId = req.query.userId
  const managerProjects = await project.find({ projectManager: userId }).sort({ _id: -1 })
  res.status(200).json({ "projects": managerProjects })


}


const createProject = async (req, res) => {

  const { projectName, projectVersion, letterNumber, numberTest, projectType, platform } = req.body

  // Convert the projectType object to an array of selected types
  const projectTypeArray = Object.entries(projectType)
    .filter(([key, value]) => value)
    .map(([key]) => key);

  // Convert the platform object to an array of selected platforms
  const platformArray = Object.entries(platform)
    .filter(([key, value]) => value)
    .map(([key]) => key);

  const createdProject = new project({
    projectName,
    version: projectVersion,
    letterNumber,
    projectType: projectTypeArray,
    platform: platformArray,
    numberOfTest: numberTest,
  });

  await createdProject.save();

  res.status(201).json({ success: true , project:createdProject})

}

const getBugs = async (req, res) => {
    const { userId, projectId } = req.query;


    try {
        // 1. Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }
const objectId = mongoose.Types.ObjectId.createFromHexString(projectId);
        
        // 3. Query using the ObjectId
        const response = await ProjectUser.find({_id:objectId});
        if (!response) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(response);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};


module.exports = {
  getUserProjects,
  getManagerProjects,
  createProject , 
  getBugs
};
