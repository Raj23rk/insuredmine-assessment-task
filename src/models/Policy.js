const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyNumber: String,
  policyStartDate: Date,
  policyEndDate: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  carrierId: { type: mongoose.Schema.Types.ObjectId, ref: "Carrier" }
});

module.exports = mongoose.model("Policy", policySchema);
