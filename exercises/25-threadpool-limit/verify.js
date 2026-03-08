const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const res = await request({ method: "GET", port, path: "/threadpool-limit" });
    assert(res.status === 200, "GET /threadpool-limit should return 200");

    let json;
    try {
      json = JSON.parse(res.body);
    } catch {
      throw new Error("GET /threadpool-limit should return valid JSON");
    }

    assert(typeof json.tasks === "number", "tasks should be a number");
    assert(json.tasks >= 8, "tasks should be at least 8");
    assert(typeof json.durationMs === "number", "durationMs should be a number");
    assert(json.durationMs >= 0, "durationMs should be non-negative");
  });
};
