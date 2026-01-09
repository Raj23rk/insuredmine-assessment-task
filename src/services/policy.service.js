

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
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $group: {
        _id: "$user._id",
        firstName: { $first: "$user.firstName" },
        email: { $first: "$user.email" },
        totalPolicies: { $sum: 1 }
      }
    },
    { $sort: { totalPolicies: -1 } }
  ]);
};


