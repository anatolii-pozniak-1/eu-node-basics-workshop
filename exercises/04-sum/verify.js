const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;

    const sum = await request({
      method: "GET",
      port,
      path: `/sum?a=${a}&b=${b}`,
    });
    assert(sum.status === 200, "GET /sum should return 200");
    let sumJson;
    try {
      sumJson = JSON.parse(sum.body);
    } catch {
      throw new Error("GET /sum should return valid JSON");
    }
    assert(sumJson.sum === a + b, "GET /sum should return correct sum");

    const bad = await request({
      method: "GET",
      port,
      path: `/sum?a=${a}`,
    });
    assert(bad.status === 400, "Missing or invalid query params should return 400");
    let badJson;
    try {
      badJson = JSON.parse(bad.body);
    } catch {
      throw new Error("Error response should be JSON");
    }
    assert(
      badJson.error === "Invalid numbers",
      "Invalid query params should return error message"
    );
  });
};
