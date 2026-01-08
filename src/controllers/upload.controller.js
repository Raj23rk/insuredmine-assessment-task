const { Worker } = require("worker_threads");
const path = require("path");

exports.uploadCSV = (req, res) => {
  let responded = false; // 🔥 KEY FIX

  try {
    const worker = new Worker(
      path.join(__dirname, "../workers/csv.worker.js"),
      { workerData: { filePath: req.file.path } }
    );

    worker.on("message", (msg) => {
      if (responded) return;

      responded = true;

      if (msg.success) {
        res.status(200).json({
          success: true,
          message: "CSV uploaded successfully"
        });
      } else {
        res.status(500).json({
          success: false,
          error: msg.error
        });
      }
    });

    worker.on("error", (error) => {
      if (responded) return;
      responded = true;
      res.status(500).json({ error: error.message });
    });

  } catch (error) {
    if (!responded) {
      res.status(500).json({ error: error.message });
    }
  }
};
