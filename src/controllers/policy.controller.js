const policyService = require("../services/policy.service");

exports.searchPolicyByUsername = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }

    const result = await policyService.searchByUsername(username);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.aggregatePolicyByUser = async (req, res) => {
  try {
    const result = await policyService.aggregateByUser();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
