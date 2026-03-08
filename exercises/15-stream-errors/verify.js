const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const bad = await request({
      method: "GET",
      port,
      path: "/missing-file?fileName=definitely-missing-file.txt",
    });
    assert(bad.status === 500, "GET /missing-file with missing file should return 500");
    assert(bad.body.includes("Internal Server Error"), "Error response should contain a safe message");

    const missingParam = await request({ method: "GET", port, path: "/missing-file" });
    assert(missingParam.status === 400, "GET /missing-file without fileName should return 400");

    const again = await request({
      method: "GET",
      port,
      path: "/missing-file?fileName=definitely-missing-file.txt",
    });
    assert(again.status === 500, "Server should stay alive after stream error");
  });
};
