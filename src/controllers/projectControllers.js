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
  const {userId,  projectName, projectVersion, letterNumber, numberTest, projectType, platform } = req.body;

  // Convert the projectType object to an array of selected types with capitalized first letters
  const projectTypeArray = Object.entries(projectType)
    .filter(([key, value]) => value)
    .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1).toLowerCase());

  // Convert the platform object to an array of selected platforms
  const platformArray = Object.entries(platform)
    .filter(([key, value]) => value)
    .map(([key]) => key);

  const createdProject = new project({
    devops:userId, 
    projectName,
    version: projectVersion,
    letterNumber,
    projectType: projectTypeArray,
    platform: platformArray,
    numberOfTest: numberTest,
  });

  await createdProject.save();

  res.status(201).json({ success: true, project: createdProject });
};

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


const updateBugStatus = async (req , res )=>{
try {
    // const { projectId, bugId, status } = req.params;
    const { projectId  , userId  , bugId , status  } = req.body;
    console.log(projectId , userId  , bugId , status )

    const bugDoc = await ProjectUser.findOne({ _id:projectId , pentester:userId  });
 
    console.log("bugDoc : " , bugDoc)
    if (!bugDoc) {
      return res.status(404).json({ message: 'Bug document not found' });
    }

    // Recursive function to update status in bugScopes
    const updateStatus = (items) => {
      return items?.map(item => {
        // If this is the item we're looking for
        if (item.id === bugId) { 
          return { ...item, status };
        }
        
        // If this item has children, search them
        if (item.children && item.children.length > 0) {
          return { ...item, children: updateStatus(item.children) };
        }
        
        // Otherwise return the item unchanged
        return item;
      });
    };

    // Update the bugScopes array
    bugDoc.bugScopes = updateStatus(bugDoc.bugScopes);

    // Recalculate progress
    // bugDoc.progress = calculateProgress(bugDoc.bugScopes);

    // Save the updated document
    await bugDoc.save();

    res.status(200).json({
      message: 'Bug status updated successfully',
      updatedBug: bugDoc
    });
  } catch (error) {
    console.error('Error updating bug status:', error);
    res.status(500).json({ message: 'Error updating bug status', error });
  }


}


const updateBulkBugStatus = async (req, res) => {
  try {
    const { projectId, userId, updates } = req.body; // Array of { bugId, status }

    console.log("updates *************** : " , updates)
    const bugDoc = await ProjectUser.findOne({ _id: projectId, pentester: userId });
    
    if (!bugDoc) {
      return res.status(404).json({ message: 'Bug document not found' });
    }

    // Create a map for faster lookup
    const updateMap = new Map(updates.map(update => [update.bugId, update.status]));
  
    // Recursive update function
    const updateStatuses = (items) => {
      return items.map(item => {
        const newItem = { ...item };
        
        if (updateMap.has(item.id)) {
          newItem.status = updateMap.get(item.id);
        }
        
        if (item.children && item.children.length > 0) {
          newItem.children = updateStatuses(item.children);
        }
        
        return newItem;
      });
    };

    bugDoc.bugScopes = updateStatuses(bugDoc.bugScopes);
    bugDoc.increment();
    await bugDoc.save();

    res.status(200).json({
      message: 'Bulk update successful',
      updatedBug: bugDoc
    });
  } catch (error) {
    console.error('Error in bulk update:', error);
    res.status(500).json({ message: 'Error in bulk update', error });
  }
};



module.exports = {
  getUserProjects,
  getManagerProjects,
  createProject , 
  getBugs , 
  updateBugStatus , 
  updateBulkBugStatus
};
