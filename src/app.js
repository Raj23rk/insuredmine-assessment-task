const express = require("express");
const uploadRoutes = require("./routes/upload.routes");
const policyRoutes = require("./routes/policy.routes");
const messageRoutes = require("./routes/message.routes");


const app = express();

app.use(express.json());

app.use("/api", uploadRoutes);
app.use("/api/policy", policyRoutes);
app.use("/api/messages", messageRoutes);


app.get("/", (req, res) => {
  res.send("InsuredMine API Running");
});

module.exports = app;
