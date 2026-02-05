const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const timeRes = await request({ method: "GET", port, path: "/time" });
    assert(timeRes.status === 200, "GET /time should return 200");
    let timeJson;
    try {
      timeJson = JSON.parse(timeRes.body);
    } catch {
      throw new Error("GET /time should return valid JSON");
    }
    assert(typeof timeJson.now === "string", "GET /time should include 'now'");
    assert(!Number.isNaN(Date.parse(timeJson.now)), "'now' must be ISO string");
  });
};
