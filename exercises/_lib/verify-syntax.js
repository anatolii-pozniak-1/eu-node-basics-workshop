const { spawnSync } = require("child_process");
const path = require("path");

module.exports = function verifySyntax(solutionPath) {
  const nodePath = process.execPath;
  const full = path.resolve(solutionPath);
  const result = spawnSync(nodePath, ["--check", full], { encoding: "utf8" });

  if (result.status !== 0) {
    const details = (result.stderr || result.stdout || "Unknown syntax error").trim();
    throw new Error(`Solution has syntax errors:\n${details}`);
  }
};
