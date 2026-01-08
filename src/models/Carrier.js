const mongoose = require("mongoose");

const carrierSchema = new mongoose.Schema({
  company_name: String
});

module.exports = mongoose.model("Carrier", carrierSchema);
