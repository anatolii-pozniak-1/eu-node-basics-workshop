const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const root = await request({ method: "GET", port, path: "/" });
    assert(root.status === 200, "GET / should return 200");
    assert(
      root.body.trim() === "Welcome to Manual HTTP Router",
      "GET / should return exact welcome text"
    );
  });
};
