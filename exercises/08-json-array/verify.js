const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const ok = await request({
      method: "POST",
      port,
      path: "/json-array",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numbers: [1, 2, 3, 4] }),
    });
    assert(ok.status === 200, "POST /json-array should return 200");

    let okJson;
    try {
      okJson = JSON.parse(ok.body);
    } catch {
      throw new Error("POST /json-array should return valid JSON");
    }
    assert(okJson.count === 4, "count should be 4");
    assert(okJson.sum === 10, "sum should be 10");
    assert(okJson.average === 2.5, "average should be 2.5");

    const empty = await request({
      method: "POST",
      port,
      path: "/json-array",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numbers: [] }),
    });
    assert(empty.status === 200, "Empty numbers array should return 200");
    const emptyJson = JSON.parse(empty.body);
    assert(emptyJson.count === 0, "Empty array count should be 0");
    assert(emptyJson.sum === 0, "Empty array sum should be 0");
    assert(emptyJson.average === 0, "Empty array average should be 0");

    const badValue = await request({
      method: "POST",
      port,
      path: "/json-array",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numbers: [1, "x", 3] }),
    });
    assert(badValue.status === 422, "Non-numeric value should return 422");

    const missing = await request({
      method: "POST",
      port,
      path: "/json-array",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert(missing.status === 422, "Missing numbers should return 422");
  });
};
