const mongoose = require("mongoose");

const scheduledMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ScheduledMessage", scheduledMessageSchema);
