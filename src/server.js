require("dotenv").config(); // 🔥 MUST be first

const app = require("./app");
const connectDB = require("./config/db");
const startCPUMonitor = require("./services/serverHealth");

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    startCPUMonitor();
  });
})();
