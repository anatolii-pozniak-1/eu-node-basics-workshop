const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const payload = "count this body";
    const res = await request({
      method: "POST",
      port,
      path: "/count",
      headers: { "Content-Type": "text/plain" },
      body: payload,
    });
    assert(res.status === 200, "POST /count should return 200");
    let json;
    try {
      json = JSON.parse(res.body);
    } catch {
      throw new Error("POST /count should return valid JSON");
    }
    assert(json.bytes === Buffer.byteLength(payload), "bytes should match request body length");
    assert(typeof json.chunks === "number" && json.chunks > 0, "chunks should be greater than 0");
  });
};
