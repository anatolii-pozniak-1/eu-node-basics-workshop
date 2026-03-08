const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const { waitForServer } = require("./verify-helpers");

function randomPort() {
  return 3000 + Math.floor(Math.random() * 4000);
}

function withTempFixtureServer(solutionPath, files, run) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "mhr-async-"));
  const solutionFile = path.join(tempDir, "solution.js");

  fs.copyFileSync(path.resolve(solutionPath), solutionFile);

  for (const [name, content] of Object.entries(files || {})) {
    const filePath = path.join(tempDir, name);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, String(content));
  }

  const port = randomPort();
  const child = spawn(process.execPath, [solutionFile, String(port)], {
    cwd: tempDir,
    stdio: "ignore",
  });

  return (async () => {
    try {
      await waitForServer(port);
      await run({ port, tempDir });
    } finally {
      child.kill();
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  })();
}

module.exports = {
  withTempFixtureServer,
};
