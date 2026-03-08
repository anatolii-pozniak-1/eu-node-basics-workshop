const fs = require("fs");
const path = require("path");
const { assert } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  const full = path.resolve(solutionPath);
  assert(fs.existsSync(full), "Workflow file does not exist");

  const text = fs.readFileSync(full, "utf8").toLowerCase();
  assert(text.includes("push") || text.includes("pull_request"), "Workflow should trigger on push or pull_request");
  assert(text.includes("setup-node"), "Workflow should use actions/setup-node");
  assert(text.includes("npm install") || text.includes("npm ci"), "Workflow should install dependencies");
  assert(
    text.includes("npm test") || text.includes("node --test"),
    "Workflow should run tests"
  );
};
