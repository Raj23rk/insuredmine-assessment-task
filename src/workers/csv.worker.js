const { workerData, parentPort } = require("worker_threads");
const fs = require("fs");
const csv = require("csv-parser");

const connectDB = require("../config/db");

const Agent = require("../models/Agent");
const User = require("../models/User");
const Account = require("../models/Account");
const Category = require("../models/Category");
const Carrier = require("../models/Carrier");
const Policy = require("../models/Policy");

(async () => {
  try {
    await connectDB();

    const stream = fs
      .createReadStream(workerData.filePath)
      .pipe(csv());

    for await (const row of stream) {
      const agent = await Agent.findOneAndUpdate(
        { agentName: row.agent },
        { agentName: row.agent },
        { upsert: true, new: true }
      );

      const user = await User.create({
        firstName: row.firstname,
        dob: row.dob,
        address: row.address,
        phone: row.phone,
        state: row.state,
        zip: row.zip,
        email: row.email,
        gender: row.gender,
        userType: row.userType
      });

      const account = await Account.create({
        accountName: row.account_name,
        userId: user._id
      });

      const category = await Category.findOneAndUpdate(
        { category_name: row.category_name },
        { category_name: row.category_name },
        { upsert: true, new: true }
      );

      const carrier = await Carrier.findOneAndUpdate(
        { company_name: row.company_name },
        { company_name: row.company_name },
        { upsert: true, new: true }
      );

      await Policy.create({
        policyNumber: row.policy_number,
        policyStartDate: row.policy_start_date,
        policyEndDate: row.policy_end_date,
        userId: user._id,
        accountId: account._id,
        categoryId: category._id,
        carrierId: carrier._id
      });
    }

    parentPort.postMessage({ success: true });
  } catch (error) {
    parentPort.postMessage({
      success: false,
      error: error.message
    });
  }
})();
