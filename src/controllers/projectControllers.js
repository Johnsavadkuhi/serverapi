const mongoose = require("mongoose");
const project = require("../models/project");
const ProjectUser = require("../models/ProjectUser");
const FoundedBug = require("../models/FoundedBug");
const fs = require("fs");
const path = require("path");
const util = require("util");
const Page = require("../models/Page");
const unlinkAsync = util.promisify(fs.unlink);

const getUserProjects = async (req, res) => {
  const userId = req.query.userId;
  const userProjects = await ProjectUser.find({ pentester: userId })
    .populate("project", "projectName expireDay")
    .populate("manager", "firstName , lastName")
    .sort({ _id: -1 });
  res.status(200).json({ projects: userProjects });
};

const getManagerProjects = async (req, res) => {
  const userId = req.query.userId;
  const managerProjects = await project
    .find({ projectManager: userId })
    .sort({ _id: -1 });
  res.status(200).json({ projects: managerProjects });
};

const createProject = async (req, res) => {
  const {
    userId,
    projectName,
    projectVersion,
    letterNumber,
    numberTest,
    projectType,
    platform,
  } = req.body;

  // Convert the projectType object to an array of selected types with capitalized first letters
  const projectTypeArray = Object.entries(projectType)
    .filter(([key, value]) => value)
    .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1).toLowerCase());

  // Convert the platform object to an array of selected platforms
  const platformArray = Object.entries(platform)
    .filter(([key, value]) => value)
    .map(([key]) => key);

  const createdProject = new project({
    devops: userId,
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
  const { userId, projectId, projectManager } = req.query;

  try {
    // 1. Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    const objectId = mongoose.Types.ObjectId.createFromHexString(projectId);

    // 3. Query using the ObjectId
    const response = await ProjectUser.find({
      project: objectId,
      pentester: userId,
      manager: projectManager,
    });
    if (!response) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(response);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateBugStatus = async (req, res) => {
  try {
    // const { projectId, bugId, status } = req.params;
    const { projectId, userId, bugId, status, progress } = req.body;

    const bugDoc = await ProjectUser.findOne({
      project: projectId,
      pentester: userId,
    });

    if (!bugDoc) {
      return res.status(404).json({ message: "Bug document not found" });
    }

    // Recursive function to update status in bugScopes
    const updateStatus = (items) => {
      return items?.map((item) => {
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
    // Update progress if provided
    if (progress !== undefined) {
      const floatProgress = parseFloat(progress);
      if (!isNaN(floatProgress)) {
        bugDoc.progress = floatProgress;
      } else {
        return res.status(400).json({ message: "Invalid progress value" });
      }
    }

    // Save the updated document
    await bugDoc.save();

    res.status(200).json({
      message: "Bug status updated successfully",
      updatedBug: bugDoc,
    });
  } catch (error) {
    console.error("Error updating bug status:", error);
    res.status(500).json({ message: "Error updating bug status", error });
  }
};

const updateBulkBugStatus = async (req, res) => {
  try {
    const { projectId, userId, updates } = req.body; // Array of { bugId, status }

    const bugDoc = await ProjectUser.findOne({
      project: projectId,
      pentester: userId,
    });

    if (!bugDoc) {
      return res.status(404).json({ message: "Bug document not found" });
    }

    // Create a map for faster lookup
    const updateMap = new Map(
      updates.map((update) => [update.bugId, update.status])
    );

    // Recursive update function
    const updateStatuses = (items) => {
      return items.map((item) => {
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
    bugDoc.progress = 100;

    bugDoc.bugScopes = updateStatuses(bugDoc.bugScopes);
    bugDoc.increment();
    await bugDoc.save();

    res.status(200).json({
      message: "Bulk update successful",
      updatedBug: bugDoc,
    });
  } catch (error) {
    console.error("Error in bulk update:", error);
    res.status(500).json({ message: "Error in bulk update", error });
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
      encoding: file.encoding,
      type: file.mimetype,
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      size: file.size,
    });
  }

  return pocs;
}

const creatReport = async (req, res) => {
  try {
    const {
      id,
      label,
      labelfa,
      wstg,
      projectId,
      projectManager,
      userId,
      cve,
      path,
      description,
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
      cvssSeverity,
      _id,
    } = req.body;

    // Check for duplicates (optional)
    const existing = await FoundedBug.findOne({ _id });
    if (existing) {
      return res.status(409).json({
        error:
          "A report with this ID already exists for the user in this project.",
      });
    }

    const pocs = getPocsUploaded(req.files);

    const newBug = new FoundedBug({
      project: projectId,
      pentester: userId,
      projectManager: projectManager,
      id,
      label,
      labelfa,
      wstg,
      CVSS: cvssScore,
      severity: cvssSeverity,
      CVE: cve,
      impact,
      description,
      other_information: "",
      pocs,
      path,
      solutions: solution,
      exploits: exploit,
      tools: Array.isArray(tools) ? tools : tools ? [tools] : [], // Ensure it's an array
      securingByOptions: {
        webServerSettings:
          webServerSecuring === "true" || webServerSecuring === true,
        modificationInProgramCode:
          codeModificationSecuring === "true" ||
          codeModificationSecuring === true,
      },
      securingByWAF: wafPossibility,
      refrence,
      cvssVector,
      description: "",
    });

    await newBug.save();
    res
      .status(201)
      .json({ message: "Report created successfully", bugId: newBug });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Failed to create report" });
  }
};

const fetchReport = async (req, res) => {
  const { projectId, userId, projectManager, id } = req.query;

  const result = await FoundedBug.find({
    project: projectId,
    pentester: userId,
    projectManager,
    id,
  });
  res.status(200).json(result);
};

const updateReport = async (req, res) => {
  try {
    const {
      id,
      label,
      labelfa,
      wstg,
      cve,
      path: reportPath,
      description,
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
      existingFiles, // Array of existing file IDs to keep
      _id, // ID of the report to update
    } = req.body;

    // Find existing report
    const existingReport = await FoundedBug.findById(_id);
    if (!existingReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Handle file updates:
    // 1. Process new files
    const newPocs = getPocsUploaded(req.files);

    // 2. Filter existing files to keep (based on frontend selection)
    const keptExistingFiles = existingReport.pocs.filter((poc) =>
      existingFiles?.includes(poc.filename)
    );

    const deletedPocs = existingReport.pocs.filter(
      (poc) => !existingFiles?.includes(poc.filename)
    );

    // Attempt to delete all removed files
    for (const file of deletedPocs) {
      try {
        const filePath = path.resolve(file.path); // Make path absolute
        await unlinkAsync(filePath);
      } catch (err) {
        // Abort update if any file fails to delete
        console.error(`Failed to delete file ${file.filename}:`, err);
        return res.status(500).json({
          error: `Failed to delete file: ${file.filename}`,
          code: "FILE_DELETE_FAILED",
        });
      }
    }

    // 3. Combine kept files with new files
    const updatedPocs = [...keptExistingFiles, ...newPocs];

    // Update report fields
    existingReport.id = id;
    existingReport.label = label;
    existingReport.labelfa = labelfa;
    existingReport.wstg = wstg;
    existingReport.CVSS = cvssScore;
    existingReport.severity = cvssSeverity;
    existingReport.CVE = cve;
    existingReport.impact = impact;
    existingReport.path = reportPath;
    (existingReport.description = description),
      (existingReport.solutions = solution);
    existingReport.exploits = exploit;
    existingReport.tools = Array.isArray(tools)
      ? tools
      : tools
        ? tools.split(",").map((t) => t.trim())
        : [];
    existingReport.securingByOptions = {
      webServerSettings:
        webServerSecuring === "true" || webServerSecuring === true,
      modificationInProgramCode:
        codeModificationSecuring === "true" ||
        codeModificationSecuring === true,
    };
    existingReport.securingByWAF = wafPossibility;
    existingReport.refrence = reference;
    existingReport.cvssVector = cvssVector;
    existingReport.pocs = updatedPocs;

    await existingReport.save();

    // TODO: Add file cleanup for removed files here
    res.status(200).json({
      message: "Report updated successfully",
      bugId: existingReport._id,
    });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ error: "Failed to update report" });
  }
};

const fetchAllReports = async (req, res) => {
  const { projectId, projectManager } = req.query;

  const result = await FoundedBug.find({
    project: projectId,
    projectManager: projectManager,
  })
    .populate("pentester", "firstName lastName profileImageUrl")
    .sort({ _id: -1 });

  res.status(200).json(result);
};

const fetchProjectById = async (req, res) => {
  const { projectId, manager } = req.query;

  const result = await project.findOne({
    _id: projectId,
    projectManager: manager,
  });

  res.status(200).json(result);
};

const fetchReportById = async (req, res) => {
  try {
    const { reportId } = req.query;

    // Add await to actually get the result of the query
    const result = await FoundedBug.findOne({ _id: reportId });

    // Check if the report was found
    if (!result) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching report: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


function includeFile(r) {
  r.pocs.forEach(poc => {
    if (poc.type?.startsWith("image/")) poc.included = true;
  });
}
function removeFile(r) {
  r.pocs.forEach(poc => {
    if (poc.type?.startsWith("image/")) poc.included = false;
  });
}

const reportVerify = async (req, res) => {
  const { state, id } = req.body.payload;

  console.log("id of report line 454  : ", id, state, req.body.payload);
  // Validate that the required fields are present
  if (!req.body.payload.id) {
    return res.status(400).json({ message: "Id is required." });
  }

  try {
    // Find the document by ID
    const report = await FoundedBug.findById(id).populate("pentester");
    if (!report) return res.status(404).json({ message: "Report not found" });

    const previousStatus = report?.state;
    const cvssScore = parseFloat(report?.CVSS);

    if (previousStatus === "Verify" && state === "Not Applicable") {
      report.pentester.score -= cvssScore;
      report.pentester.score -= 5;
      report.grade = -5;
      removeFile(report)
    } else if (previousStatus === "Verify" && state === "Duplicate") {
      report.grade = cvssScore;
      removeFile(report)

    } else if (previousStatus === "Verify" && state === "Verify") {
      report.grade = cvssScore; // No score change, just retain the CVSS score
    } else if (previousStatus === "Not Applicable" && state === "Verify") {
      report.pentester.score += 5;
      report.pentester.score += cvssScore;
      report.grade = cvssScore;
      includeFile(report)

    } else if (previousStatus === "Not Applicable" && state === "Duplicate") {
      report.pentester.score += 5;
      report.pentester.score += cvssScore;
      report.grade = cvssScore;
    } else if (
      previousStatus === "Not Applicable" &&
      state === "Not Applicable"
    ) {
      // No score change for this transition
    } else if (previousStatus === "New" && state === "Verify") {
      report.grade = parseFloat(req.body.payload.score);
      report.pentester.score += parseFloat(req.body.payload.score);
      includeFile(report)

    } else if (previousStatus === "New" && state === "Not Applicable") {
      report.pentester.score -= 5;
      report.grade = -5;
    } else if (previousStatus === "New" && state === "Duplicate") {
      report.pentester.score += cvssScore;
      report.grade = cvssScore;
      // report.pentester.score += parseFloat(req.body.payload.score);
    } else if (previousStatus === "Duplicate" && state === "Verify") {
      report.grade = cvssScore;
      includeFile(report)

    } else if (previousStatus === "Duplicate" && state === "Not Applicable") {
      report.pentester.score -= cvssScore;
      report.pentester.score -= 5;
      report.grade = -5;
    } else if (previousStatus === "Duplicate" && state === "Duplicate") {
    } else if (previousStatus === "Verify" && state === "New") {
      // No score change for this t

      report.grade = 0;
      report.pentester.score -= cvssScore;
      removeFile(report)
    } else if (previousStatus === "Duplicate" && state === "New") {
      // No score change for this transition
      report.grade = 0;
      report.pentester.score -= cvssScore;
    } else if (previousStatus === "Not Applicable" && state === "New") {
      // No score change for this transition
      report.grade = 0;
      report.pentester.score += 5;
    } else if (previousStatus === "New" && state === "New") {
      // No score change for this transition
    } else if (previousStatus === "Need More Information" && state === "New") {
      // No score change for this transition
    } else if (
      previousStatus === "Need More Information" &&
      state === "Verify"
    ) {
      // No score change for this transition
      report.grade = parseFloat(req.body.payload.score);
      report.pentester.score += parseFloat(req.body.payload.score);
      includeFile(report)

    } else if (
      previousStatus === "Need More Information" &&
      state === "Duplicate"
    ) {
      report.pentester.score += cvssScore;
      report.grade = cvssScore;
      report.pentester.score += parseFloat(req.body.payload.score);
    } else if (
      previousStatus === "Need More Information" &&
      state === "Not Applicable"
    ) {
      report.pentester.score -= 5;
      report.grade = -5;
    } else if (
      previousStatus === "Need More Information" &&
      state === "Need More Information"
    ) {
      // No score change for this transition
    }

    report.state = state;
    // report.managerVerifyDate = req.body.managerVerifyDate;
    report.managerVerifyDate = new Date();

    // Update the document
    await report.save();
    await report.pentester.save();

    // Return the updated document and a 200 status code on success
    return res.status(200).json({ message: "Report updated successfully." });
  } catch (error) {
    console.error("Error updating report:", error);
    // Return a 500 status code and error message if something goes wrong
    return res.status(500).json({
      message: "An error occurred while updating the report.",
      error: error.message,
    });
  }
};

const deleteReportById = async (req, res) => {
  const { reportId } = req.body;

  if (!reportId) {
    return res.status(400).json({
      message: "Missing required reportId in request body",
      code: 400,
    });
  }

  try {
    // Step 1: Fetch the report
    const report = await FoundedBug.findById(reportId);

    if (!report) {
      return res.status(404).json({
        message: "No report found with the provided ID",
        code: 404,
      });
    }

    // Step 2: Try deleting all POC files
    const pocs = report.pocs || [];

    for (const poc of pocs) {
      const filePath = path.resolve(poc.path);
      try {
        await fs.promises.unlink(filePath);
      } catch (fileErr) {
        console.error(
          `Failed to delete file at ${filePath}: ${fileErr.message}`
        );

        // Stop and respond with error before deleting DB record
        return res.status(500).json({
          message: `Failed to delete file: ${poc.name || filePath}`,
          code: 500,
          error: fileErr.message,
        });
      }
    }

    // Step 3: Delete the report document
    const deleted = await FoundedBug.deleteOne({ _id: reportId });

    if (deleted.deletedCount === 0) {
      return res.status(500).json({
        message: "Report deletion failed at database level",
        code: 500,
      });
    }

    return res.status(200).json({
      message: "Successfully deleted the report and associated files",
      code: 200,
    });
  } catch (error) {
    console.error("Unexpected error while deleting report:", error);
    return res.status(500).json({
      message: "An unexpected error occurred while deleting the report",
      code: 500,
      error: error.message,
    });
  }
};

const fetchProjectByUserProjectManager = async (req, res) => {
  const { project: projectId, pentester, projectManager } = req.query;

  const result = await ProjectUser.findOne({
    project: projectId,
    pentester,
    manager: projectManager,
  });

  res.status(200).json(result);
};




const updateProjectStatus1 = async (req, res) => {
  try {
    const { projectId, userId, newStatus } = req.body;

    const projectUser = await ProjectUser.findOne({ project: projectId, pentester: userId });
    if (!projectUser) return res.status(404).json({ message: 'Project not found' });


    if (!projectUser.startDate) {
      console.log("start date initialed for the first time : ", projectUser.startDate)
      projectUser.startDate = new Date().toISOString();
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


    res.json({
      status: projectUser.status,
      totalWorkTime: projectUser.totalWorkTime
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

const updateProjectStatus = async (req, res) => {
  try {
    const { projectId, userId, newStatus } = req.body.projectId ;
console.log("projectID : " ,projectId , userId , newStatus )
    // پیدا کردن پروژه
    const projectUser = await ProjectUser.findOne({ project: projectId, pentester: userId });
    if (!projectUser) {
      return res.status(404).json({ message: "Project not found" });
    }

    const now = new Date();
    const prevStatus = projectUser.status || 'Open';

    // اولین شروع پروژه
    if (!projectUser.startDate) {
      projectUser.startDate = now;
    }

    // اگر از In-Progress خارج می‌شویم → محاسبه مدت کار و جمع کردن
    if (prevStatus === 'In-Progress' && (newStatus === 'Pending' || newStatus === 'Finish' || newStatus === 'Open')) {
      const lastInProgress = [...(projectUser.stateChanges || [])]
        .reverse()
        .find(change => change.state === 'In-Progress');

      if (lastInProgress?.timestamp) {
        const startTime = new Date(lastInProgress.timestamp).getTime();
        const elapsedSec = Math.max(0, Math.floor((now.getTime() - startTime) / 1000)); // به ثانیه
        projectUser.totalWorkTime = (projectUser.totalWorkTime || 0) + elapsedSec;
      }
    }

    // اگر به In-Progress وارد شد → فقط ثبت زمان شروع
    if (newStatus === 'In-Progress' && prevStatus !== 'In-Progress') {
      
      projectUser.stateChanges = projectUser.stateChanges || [];
    }

    
    // اگر به In-Progress وارد شد → فقط در اولین بار startDate را ست کن
    if (newStatus === 'In-Progress' ) {
      if (!projectUser.startDate) {
        projectUser.startDate = now; // مقداردهی فقط یک بار
      }
    }
    // ثبت تاریخ پایان اگر Finish شد
    if (newStatus === 'Finish') {
        projectUser.finishDate = now;
      
    } else if (projectUser.finishDate) {
      // اگر reopen شد، تاریخ پایان پاک شود
      projectUser.finishDate = null;
    }

    // تغییر وضعیت و لاگ تاریخچه
    projectUser.status = newStatus;
    if (!Array.isArray(projectUser.stateChanges)) projectUser.stateChanges = [];
    projectUser.stateChanges.push({
      state: newStatus,
      timestamp: now
    });

    await projectUser.save();

    return res.json({
      status: projectUser.status,
      totalWorkTime: projectUser.totalWorkTime || 0, // به ثانیه
      stateChanges: projectUser.stateChanges,
      startDate: projectUser.startDate,
    });
  } catch (error) {
    console.error("Error updating project status:", error);
    res.status(500).json({ message: "Failed to update project status" });
  }
};


const fetchUserProjectById = async (req, res) => {
  const { projectId, userId } = req.query;
  const result = await ProjectUser.find({
    project: projectId,
    pentester: userId,
  });
  res.status(200).json(result);
};

const fetchAllUserReport = async (req, res) => {
  const { projectId, userId } = req.query;

  const result = await FoundedBug.find({
    project: projectId,
    pentester: userId,
  });

  res.status(200).json(result);
};

const getAllBugsForReport = async (req, res) => {
  try {
    const { projectId } = req.query;
    // Validate input
    if (!projectId) {
      return res
        .status(400)
        .json({ message: "Missing projectId in query parameters." });
    }

    // Query the database
    const allReports = await FoundedBug.find({
      project: projectId,
      state: { $eq: "Verify" },
    });

    // Optionally check if no results were found
    if (!allReports || allReports.length === 0) {
      return res
        .status(404)
        .json({ message: "No verified bugs found for this project." });
    }

    // Log and return results
    return res.status(200).json(allReports);
  } catch (error) {
    console.error("Error fetching verified bugs:", error);
    return res.status(500).json({
      message: "Server error while fetching verified bugs.",
      error: error.message,
    });
  }
};

const getPage = async (req, res) => {
  const { project } = req.query;

  try {
    const result = await Page.findOne({ project })
      .hint("project_1") // استفاده از نام ایندکس
      .lean();
    console.log("result of getPAGE : ", result);
    res.status(200).send(result);
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send(error.message);
  }
};

const setPage = async (req, res) => {
  try {
    const { project, ...updateData } = req.body.data; // Destructure _id and rest of the data
    const r = await Page.findOne({ project });
    let result;

    if (r) {
      // If _id exists, update the existing document
      result = await Page.findOneAndUpdate(
        { project }, // Find the document by _id
        { $set: updateData }, // Update with the new data (everything except _id)
        { upsert: true, new: true } // Return the updated document
      );
    } else {
      const page = new Page(req.body.data);
      result = await page.save();
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in setPage:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postIdentifier = async (req, res) => {
  try {
    const { projectId, formData } = req.body;

    // Validate projectId
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    // Define required fields
    const requiredFields = [
      "developer",
      "certificateRequest",
      "organizationalUnitName",
      "projectManagerName",
      // Removed phone numbers from required fields
      "beneficiaryOffice",
      "followerName",
      "datacenterName",
      "responsibleName",
      "projectAcceptanceDate", 
      "reportIssueDate", 
    "testDate",
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(
      (field) => !formData?.[field] || formData[field].toString().trim() === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    // Proceed to update project
    const updatedProject = await project.findByIdAndUpdate(
      projectId,
      { $set: { identifier: formData } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res
      .status(200)
      .json({ message: "Project identifier updated successfully" });
  } catch (error) {
    console.error("Error in postIdentifier:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getPentesterByProjectId = async (req, res) => {
  try {
    const { projectId } = req.query;

    // Find all project-user associations for the given project and populate the pentester field with firstName and lastName
    const result = await ProjectUser.find({ project: projectId })
      .populate("pentester", "firstName lastName profileImageUrl")
      .populate("manager", "firstName , lastName");

    // Send the populated result directly to the client
    res.send(result);
  } catch (error) {
    console.error("Error fetching pentesters by project ID:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching pentesters." });
  }
};

const getProjectById = async(req , res)=>{

  const {projectId }  = req.query 

  const result =await  project.findOne({_id:projectId})

  console.log(result ) 

  res.status(200).json(result)


}

module.exports = {
  getUserProjects,
  getManagerProjects,
  createProject,
  getBugs,
  updateBugStatus,
  updateBulkBugStatus,
  creatReport,
  fetchReport,
  updateReport,
  fetchAllReports,
  fetchProjectById,
  fetchReportById,
  reportVerify,
  deleteReportById,
  fetchProjectByUserProjectManager,
  updateProjectStatus,
  fetchUserProjectById,
  fetchAllUserReport,
  getAllBugsForReport,
  getPage,
  setPage,
  postIdentifier,
  getPentesterByProjectId,
  getProjectById
};
