const express = require("express");
const multer = require("multer");
const uploadController = require("../controllers/upload.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * ✅ Make sure uploadController.uploadCSV exists
 */
router.post(
  "/upload",
  upload.single("file"),
  uploadController.uploadCSV
);

module.exports = router;
