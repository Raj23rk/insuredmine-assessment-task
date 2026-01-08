

const Policy = require("../models/Policy");

exports.searchByUsername = async (username) => {
  return Policy.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $match: {
        "user.firstName": username
      }
    }
  ]);
};

exports.aggregateByUser = async () => {
  return Policy.aggregate([
    {
      $group: {
        _id: "$userId",
        totalPolicies: { $sum: 1 }
      }
    }
  ]);
};


