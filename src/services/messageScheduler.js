const ScheduledMessage = require("../models/ScheduledMessage");

exports.scheduleMessage = async (message, day, time) => {
  const scheduledAt = new Date(`${day} ${time}`);

  if (isNaN(scheduledAt.getTime())) {
    throw new Error("Invalid date or time format");
  }

  return ScheduledMessage.create({
    message,
    scheduledAt
  });
};
