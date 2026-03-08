const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const { waitForServer } = require("./verify-helpers");

function randomPort() {
  return 3000 + Math.floor(Math.random() * 4000);
}

function withTempFileServer(solutionPath, initialData, run) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "mhr-file-"));
  const solutionFile = path.join(tempDir, "solution.js");
  const dataFile = path.join(tempDir, "data.json");

  fs.copyFileSync(path.resolve(solutionPath), solutionFile);
  fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));

  const port = randomPort();
  const child = spawn(process.execPath, [solutionFile, String(port)], {
    cwd: tempDir,
    stdio: "ignore",
  });

  const readDataJson = () => JSON.parse(fs.readFileSync(dataFile, "utf8"));

  return (async () => {
    try {
      await waitForServer(port);
      await run({ port, tempDir, dataFile, readDataJson });
    } finally {
      child.kill();
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  })();
}

module.exports = {
  withTempFileServer,
};
