const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const sum = await request({
      method: "POST",
      port,
      path: "/sum",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: 2, b: 5 }),
    });
    assert(sum.status === 200, "POST /sum should return 200");
    let sumJson;
    try {
      sumJson = JSON.parse(sum.body);
    } catch {
      throw new Error("POST /sum should return valid JSON");
    }
    assert(sumJson.sum === 7, "POST /sum should return correct sum");

    const bad = await request({
      method: "POST",
      port,
      path: "/sum",
      headers: { "Content-Type": "application/json" },
      body: "{bad json",
    });
    assert(bad.status === 400, "Invalid JSON should return 400");
    let badJson;
    try {
      badJson = JSON.parse(bad.body);
    } catch {
      throw new Error("Error response should be JSON");
    }
    assert(
      badJson.error === "Invalid numbers",
      "Invalid JSON should return error message"
    );
  });
};
