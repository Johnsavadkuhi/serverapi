const mongoose= require("mongoose")
const project = require("../models/project")
const ProjectUser = require("../models/ProjectUser")
const FoundedBug = require("../models/FoundedBug")
const fs = require('fs');
const path = require('path');


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
    res.status(201).json({ message: 'Report created successfully', bugId: newBug });
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
    existingReport.refrence = reference;
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


const fetchReportById = async (req, res) => {
  try {
    const { reportId } = req.query;
    console.log("reportId: ", req.query, reportId);
    
    // Add await to actually get the result of the query
    const result = await FoundedBug.findOne({ _id: reportId });
    console.log("result: ", result);
    
    // Check if the report was found
    if (!result) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching report: ", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const reportVerify = async (req, res) => {
    const { state, id } = req.body;

    console.log("state : " , state , id )
    // Validate that the required fields are present
    if (!req.body.id) {
        return res.status(400).json({ message: "Id is required." });
    }

    if (!req.body.state && !req.body.score) {
        return res.status(400).json({ message: "Either state or score must be provided." });
    }

    try {
        // Find the document by ID
        const report = await FoundedBug.findById(id).populate('pentester');
        if (!report) return res.status(404).json({ message: 'Report not found' });

        const previousStatus = report?.state;
        const cvssScore = parseFloat(report?.CVSS);

        if (previousStatus === 'Verify' && state === 'Not Applicable') {
            report.pentester.score -= cvssScore;
            report.pentester.score -= 5;
            report.grade = -5;
        } else if (previousStatus === 'Verify' && state === 'Duplicate') {
            report.grade = cvssScore;
        } else if (previousStatus === 'Verify' && state === 'Verify') {
            report.grade = cvssScore; // No score change, just retain the CVSS score
        } else if (previousStatus === 'Not Applicable' && state === 'Verify') {
            report.pentester.score += 5;
            report.pentester.score += cvssScore;
            report.grade = cvssScore;
        } else if (previousStatus === 'Not Applicable' && state === 'Duplicate') {
            report.pentester.score += 5;
            report.pentester.score += cvssScore;
            report.grade = cvssScore;
        } else if (previousStatus === 'Not Applicable' && state === 'Not Applicable') {
            // No score change for this transition
        } else if (previousStatus === 'New' && state === 'Verify') {
            report.grade = parseFloat(req.body.score);
            report.pentester.score += parseFloat(req.body.score);
        } else if (previousStatus === 'New' && state === 'Not Applicable') {
            report.pentester.score -= 5;
            report.grade = -5;
        } else if (previousStatus === 'New' && state === 'Duplicate') {
            report.pentester.score += cvssScore;
            report.grade = cvssScore;
            report.pentester.score += parseFloat(req.body.score);
        } else if (previousStatus === 'Duplicate' && state === 'Verify') {
            report.grade = cvssScore;
        } else if (previousStatus === 'Duplicate' && state === 'Not Applicable') {
            report.pentester.score -= cvssScore;
            report.pentester.score -= 5;
            report.grade = -5;
        } else if (previousStatus === 'Duplicate' && state === 'Duplicate') {


        } else if (previousStatus === 'Verify' && state === 'New') {
            // No score change for this t

            console.log("previousStatus : ", previousStatus, "\n state : ", state)
            console.log("report.grade : ", report.grade)
            console.log("cvssScore : ", cvssScore)
            report.grade = 0
            report.pentester.score -= cvssScore;


        } else if (previousStatus === 'Duplicate' && state === 'New') {
            // No score change for this transition
            console.log("report.pentester.score : ", report.pentester.score, " \r cvssScore : ", cvssScore)
            report.grade = 0
            report.pentester.score -= cvssScore;

        } else if (previousStatus === 'Not Applicable' && state === 'New') {
            // No score change for this transition
            report.grade = 0
            report.pentester.score += 5;

        } else if (previousStatus === 'New' && state === 'New') {
            // No score change for this transition

        }

        report.state = state;
        report.managerVerifyDate = req.body.managerVerifyDate;

        // Update the document
        await report.save();
        await report.pentester.save();

        // Return the updated document and a 200 status code on success
        return res.status(200).json({ message: "Report updated successfully." });
    } catch (error) {
        console.error("Error updating report:", error);
        // Return a 500 status code and error message if something goes wrong
        return res.status(500).json({ message: "An error occurred while updating the report.", error: error.message });
    }
};


const deleteReportById = async (req, res) => {
  const { reportId } = req.body;

  if (!reportId) {
    return res.status(400).json({
      message: "Missing required reportId in request body",
      code: 400
    });
  }

  try {
    // Step 1: Fetch the report to get pocs paths
    const report = await FoundedBug.findById(reportId);

    if (!report) {
      return res.status(404).json({
        message: "No report found with the provided ID",
        code: 404
      });
    }

    // Step 2: Delete each file from the file system
    const deleteFilePromises = (report.pocs || []).map(poc => {
      const filePath = path.resolve(poc.path); // Ensure absolute path
      return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            // Log and continue (don't block deletion for missing files)
            console.warn(`Failed to delete file at ${filePath}: ${err.message}`);
          }
          resolve(); // always resolve to continue
        });
      });
    });

    await Promise.all(deleteFilePromises);

    // Step 3: Delete the report document
    await FoundedBug.deleteOne({ _id: reportId });

    res.status(200).json({
      message: "Successfully deleted the report and associated files",
      code: 200
    });

  } catch (error) {
    console.error("Error deleting report and files:", error);
    res.status(500).json({
      message: "An error occurred while deleting the report",
      code: 500,
      error: error.message
    });
  }
};


const fetchProjectByUserProjectManager = async(req , res )=>{

  const {project:projectId  , pentester , projectManager } = req.query 

  console.log("projectId : " , projectId , pentester , projectManager)

 const result = await ProjectUser.findOne({project:projectId , pentester , manager:projectManager})

  res.status(200).json(result )



}



const updateProjectStatus = async(req , res )=>{

  const {projectId , newStatus  } = req.body 

  const projectUser = await ProjectUser.findOne({ _id: projectId });
  console.log("projectUser : " , projectUser )
  if (!projectUser) {
            return res.status(404).json({ message: 'Project not found' });
        }
 if (!projectUser.startDate) {
            console.log("start date initialed for the first time : ", projectUser.startDate)
            projectUser.startDate = new Date().toISOString();
                        console.log("start date initialed for the first time : ", projectUser.startDate)

        }
  // Add the new state and timestamp to the stateChanges array
        if (!projectUser.stateChanges) {
            projectUser.stateChanges = [];
        }

        const currentTime = new Date()
        const previousStatus = projectUser.status; // Store the previous status

        // Update the status
        projectUser.status = newStatus;

        projectUser.stateChanges.push({
            state: newStatus,
            timestamp: currentTime,
        });


            // Calculate the total work time only for a valid transition from 'In-Progress' to 'Pending' or 'Finish'
        if (previousStatus === 'In-Progress' && (newStatus === 'Pending' || newStatus === 'Finish')) {
            // Find the last 'In-Progress' timestamp
            const lastInProgress = projectUser.stateChanges
                .filter(change => change.state === 'In-Progress')
                .slice(-1)[0];

            if (lastInProgress) {
                const timeWorked = currentTime - new Date(lastInProgress.timestamp);
                projectUser.totalWorkTime = (projectUser.totalWorkTime || 0) + timeWorked;
            }
        }

        // Save the updated document
        await projectUser.save();

        res.json({ status: projectUser.status });


}


const fetchUserProjectById= async(req , res)=>{

  const {projectId , userId } = req.query 
  console.log("project Id , userId : " ,req.query )
  const result = await ProjectUser.find({project:projectId ,  pentester:userId })
  console.log("result : " , result  )
  res.status(200).json(result)
}; 

const fetchAllUserReport = async(req , res)=>{

  const {projectId , userId } = req.query 
  
  const result = await FoundedBug.find({project:projectId , pentester:userId })

  // console.log("result in 666: " , result )
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
  fetchProjectById , 
  fetchReportById, 
  reportVerify , 
  deleteReportById  , 
  fetchProjectByUserProjectManager , 
  updateProjectStatus, 
  fetchUserProjectById, 
  fetchAllUserReport
  
}; 
 