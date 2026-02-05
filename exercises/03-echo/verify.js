const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const echo = await request({
      method: "GET",
      port,
      path: "/echo?msg=hello",
    });
    assert(echo.status === 200, "GET /echo should return 200");
    assert(echo.body === "hello", "GET /echo should return msg text");

    const empty = await request({ method: "GET", port, path: "/echo" });
    assert(empty.status === 200, "GET /echo without msg should return 200");
    assert(empty.body === "", "GET /echo without msg should return empty");
  });
};
