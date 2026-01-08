const os = require("os");

function getCPUUsage() {
  const cpus = os.cpus();

  let idle = 0;
  let total = 0;

  cpus.forEach((core) => {
    for (const type in core.times) {
      total += core.times[type];
    }
    idle += core.times.idle;
  });

  const usage = 100 - Math.round((idle / total) * 100);
  return usage;
}

module.exports = getCPUUsage;
