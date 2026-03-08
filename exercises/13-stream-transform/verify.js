const { request, assert } = require("../_lib/verify-helpers");
const { withTempFixtureServer } = require("../_lib/verify-async-helpers");

module.exports = async function verify(solutionPath) {
  await withTempFixtureServer(solutionPath, { "file.txt": "Hello Mixed Case" }, async ({ port }) => {
    const res = await request({ method: "GET", port, path: "/upper?fileName=file.txt" });
    assert(res.status === 200, "GET /upper should return 200");
    assert(res.body === "HELLO MIXED CASE", "Response should be uppercase transformed content");

    const missingParam = await request({ method: "GET", port, path: "/upper" });
    assert(missingParam.status === 400, "GET /upper without fileName should return 400");
  });
};
