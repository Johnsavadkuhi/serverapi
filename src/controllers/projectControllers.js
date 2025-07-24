const mongoose= require("mongoose")
const project = require("../models/project")
const ProjectUser = require("../models/ProjectUser")
const FoundedBug = require("../models/FoundedBug")


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
    const { userId, projectId , projectManager } = req.query;


    try {
        // 1. Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }
const objectId = mongoose.Types.ObjectId.createFromHexString(projectId);
        
        // 3. Query using the ObjectId
        const response = await ProjectUser.find({project:objectId , pentester:userId , manager:projectManager });
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

    const bugDoc = await ProjectUser.findOne({ project:projectId , pentester:userId  });
 
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
    const bugDoc = await ProjectUser.findOne({ project: projectId, pentester: userId });
    
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



function getPocsUploaded(files) {
    if (!files || !Array.isArray(files)) {
        return [];
    }

    let pocs = [];
    for (const file of files) {
        if (!file.path || !file.originalname || !file.mimetype) {
            continue;
        }

        pocs.push({
            originalname: file.originalname,
            encoding:file.encoding , 
            type: file.mimetype,
           destination : file.destination, 
          filename:file.filename  ,
            path: file.path,
            size:file.size 
        });
    }

    return pocs;
}



const creatReport = async (req, res) => {
  try {
    console.log('Form fields:', req.body);
    console.log('Uploaded files:', req.files);

    const {
      id,
      label,
      wstg,
      projectId,
      projectManager,
      userId , 
      cve,
      path,
      impact,
      exploit,
      solution,
      tools,
      webServerSecuring,
      codeModificationSecuring,
      wafPossibility,
      refrence,
      cvssScore,
      cvssVector,
      cvssSeverity , 
      _id 
    } = req.body;


    // Check for duplicates (optional)
    const existing = await FoundedBug.findOne({ _id });
    if (existing) {
      return res.status(409).json({ error: 'A report with this ID already exists for the user in this project.' });
    }

    const pocs = getPocsUploaded(req.files);

    const newBug = new FoundedBug({
      project: projectId,
      pentester: userId,
      projectManager: projectManager,
      id,
      label,
      wstg,
      CVSS: cvssScore,
      severity: cvssSeverity,
      CVE: cve,
      impact,
      other_information: "",
      pocs,
      path,
      solutions: solution,
      exploits: exploit,
      tools: Array.isArray(tools) ? tools : (tools ? [tools] : []), // Ensure it's an array
      securingByOptions: {
        webServerSettings: webServerSecuring === 'true' || webServerSecuring === true,
        modificationInProgramCode: codeModificationSecuring === 'true' || codeModificationSecuring === true
      },
      securingByWAF: wafPossibility,
      refrence,
      cvssVector,
      description: ""
    });

    await newBug.save();
    res.status(201).json({ message: 'Report created successfully', bugId: newBug._id });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Failed to create report' });
  }
};


const fetchReport = async(req , res )=>{

  const {projectId, userId , projectManager, id} = req.query 

  console.log(" projectId , userId , projectManager, id *************************** " , projectId , userId , projectManager, id ) 

  console.log("req is call this api #######################")
  const result = await FoundedBug.find({project:projectId , pentester:userId , projectManager , id })
  res.status(200).json(result)

}

const updateReport = async (req, res) => {
  try {


    const {
      id,
      label,
      wstg,
      cve,
      path,
      impact,
      exploit,
      solution,
      tools,
      webServerSecuring,
      codeModificationSecuring,
      wafPossibility,
      reference,
      cvssScore,
      cvssVector,
      cvssSeverity,
      existingFiles,  // Array of existing file IDs to keep
      _id  // ID of the report to update
    } = req.body;
console.log("existingFiles : ", existingFiles )
    // Find existing report
    const existingReport = await FoundedBug.findById(_id);
    if (!existingReport) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Handle file updates:
    // 1. Process new files
    const newPocs = getPocsUploaded(req.files);
    
    // 2. Filter existing files to keep (based on frontend selection)
    const keptExistingFiles = existingReport.pocs.filter(poc => 
      existingFiles?.includes(poc.filename)
    );
    
    // 3. Combine kept files with new files
    const updatedPocs = [...keptExistingFiles, ...newPocs];

    // Update report fields
    existingReport.id = id;
    existingReport.label = label;
    existingReport.wstg = wstg;
    existingReport.CVSS = cvssScore;
    existingReport.severity = cvssSeverity;
    existingReport.CVE = cve;
    existingReport.impact = impact;
    existingReport.path = path;
    existingReport.solutions = solution;
    existingReport.exploits = exploit;
    existingReport.tools = Array.isArray(tools) 
      ? tools 
      : (tools ? tools.split(',').map(t => t.trim()) : []);
    existingReport.securingByOptions = {
      webServerSettings: webServerSecuring === 'true' || webServerSecuring === true,
      modificationInProgramCode: codeModificationSecuring === 'true' || codeModificationSecuring === true
    };
    existingReport.securingByWAF = wafPossibility;
    existingReport.reference = reference;
    existingReport.cvssVector = cvssVector;
    existingReport.pocs = updatedPocs;

    await existingReport.save();
    
    // TODO: Add file cleanup for removed files here
    res.status(200).json({ 
      message: 'Report updated successfully', 
      bugId: existingReport._id 
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Failed to update report' });
  }
};

const fetchAllReports = async(req , res )=>{

  const {projectId , projectManager } = req.query

  console.log(req.query )
  const result = await FoundedBug.find({project:projectId , projectManager:projectManager  })
  .populate('pentester', 'firstName lastName profileImageUrl').sort({_id:-1})



  res.status(200).json(result) 


}


const fetchProjectById = async(req , res)=>{
console.log("req.query : " , req.query )

  const {projectId , manager  } = req.query 

  const result = await project.findOne({_id:projectId , projectManager :manager  })

  console.log("result line 394 : " , result )

  res.status(200).json(result)

}




module.exports = {
  getUserProjects,
  getManagerProjects,
  createProject , 
  getBugs , 
  updateBugStatus , 
  updateBulkBugStatus , 
  creatReport,
  fetchReport, 
  updateReport , 
  fetchAllReports , 
  fetchProjectById 
  
}; 
 