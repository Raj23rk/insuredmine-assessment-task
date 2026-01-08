const express = require("express");
const policyController = require("../controllers/policy.controller");

const router = express.Router();

router.get("/search", policyController.searchPolicyByUsername);
router.get("/aggregate", policyController.aggregatePolicyByUser);

module.exports = router;
