const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const notFound = await request({ method: "GET", port, path: "/nope" });
    assert(notFound.status === 404, "Unknown route should return 404");
    let nfJson;
    try {
      nfJson = JSON.parse(notFound.body);
    } catch {
      throw new Error("404 response should be JSON");
    }
    assert(nfJson.error === "Not found", "404 JSON error message incorrect");
  });
};
