const multer = require("multer");
const path = require("path");
const fs = require("fs");
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid"); // ← Add UUID

const ticketFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { ticketId, uploadContext } = req.body;

    console.log("ticketId , uploadContext : " , ticketId , uploadContext)
    if (!ticketId || !uploadContext) {
      return cb(new Error("ticketId and uploadContext are required"), null);
    }

    if (!["attachments", "comments"].includes(uploadContext)) {
      return cb(new Error("Invalid upload context"), null);
    }

    const baseDir = `upload/tickets/${ticketId}/${uploadContext}`;

    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    cb(null, baseDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .png, .pdf, etc.
    const baseName = path.basename(file.originalname, ext); // original name
    const slug = slugify(baseName, { lower: true, strict: true });
    const uniqueName = `${uuidv4()}-${slug}${ext}`; // UUID + slug + extension
    cb(null, uniqueName);
  }
});

const ticketUpload = multer({ storage: ticketFileStorage });

module.exports = ticketUpload;
