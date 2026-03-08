const { request, assert } = require("../_lib/verify-helpers");
const { withTempFileServer } = require("../_lib/verify-file-helpers");

module.exports = async function verify(solutionPath) {
  const initial = [
    { id: 1, name: "Alpha" },
    { id: 2, name: "Beta" },
  ];

  await withTempFileServer(solutionPath, initial, async ({ port }) => {
    const res = await request({ method: "GET", port, path: "/items" });
    assert(res.status === 200, "GET /items should return 200");
    assert(
      String(res.headers["content-type"] || "").includes("application/json"),
      "GET /items should return application/json"
    );

    let json;
    try {
      json = JSON.parse(res.body);
    } catch {
      throw new Error("GET /items should return valid JSON");
    }

    assert(Array.isArray(json), "GET /items should return JSON array");
    assert(
      JSON.stringify(json) === JSON.stringify(initial),
      "GET /items should return all resources"
    );
  });
};
