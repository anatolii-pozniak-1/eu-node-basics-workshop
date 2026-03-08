const { request, assert } = require("../_lib/verify-helpers");
const { withTempFixtureServer } = require("../_lib/verify-async-helpers");
const fs = require("fs");
const path = require("path");

module.exports = async function verify(solutionPath) {
  const payload = "uploaded via stream";
  await withTempFixtureServer(solutionPath, {}, async ({ port, tempDir }) => {
    const res = await request({
      method: "POST",
      port,
      path: "/upload",
      headers: { "Content-Type": "text/plain" },
      body: payload,
    });
    assert(res.status === 200, "POST /upload should return 200");
    const saved = fs.readFileSync(path.join(tempDir, "upload.txt"), "utf8");
    assert(saved === payload, "upload.txt should match uploaded body");

    const notFound = await request({ method: "GET", port, path: "/unknown-route" });
    assert(notFound.status === 404, "Unknown route should return 404");
  });
};
