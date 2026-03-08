const { request, assert } = require("../_lib/verify-helpers");
const { withTempFixtureServer } = require("../_lib/verify-async-helpers");

module.exports = async function verify(solutionPath) {
  await withTempFixtureServer(solutionPath, { "file.txt": "Hello stream response" }, async ({ port }) => {
    const res = await request({ method: "GET", port, path: "/file?fileName=file.txt" });
    assert(res.status === 200, "GET /file should return 200");
    assert(res.body === "Hello stream response", "Response body should match streamed file content");

    const missingParam = await request({ method: "GET", port, path: "/file" });
    assert(missingParam.status === 400, "GET /file without fileName should return 400");
  });
};
