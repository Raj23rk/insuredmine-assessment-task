const getCPUUsage = require("./cpuMonitor");

function startCPUMonitor() {
  setInterval(() => {
    const cpuUsage = getCPUUsage();

    console.log(`CPU Usage: ${cpuUsage}%`);

    if (cpuUsage >= 70) {
      console.error("⚠️ CPU usage exceeded 20%. Restarting server...");
      process.exit(1); // PM2 / nodemon will restart
    }
  }, 5000); // every 5 seconds
}

module.exports = startCPUMonitor;
