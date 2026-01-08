const messageService = require("../services/messageScheduler");

exports.createScheduledMessage = async (req, res) => {
  try {
    const { message, day, time } = req.body;

    if (!message || !day || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const data = await messageService.scheduleMessage(message, day, time);

    res.status(201).json({
      message: "Message scheduled successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



