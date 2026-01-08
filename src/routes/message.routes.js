const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");

router.post("/schedule", messageController.createScheduledMessage);

module.exports = router;
