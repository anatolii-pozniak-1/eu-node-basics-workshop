const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const payload = { message: "Hello" };
    const ok = await request({
      method: "POST",
      port,
      path: "/json-echo",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    assert(ok.status === 200, "POST /json-echo should return 200");
    assert(
      String(ok.headers["content-type"] || "").includes("application/json"),
      "POST /json-echo should return application/json"
    );

    let okJson;
    try {
      okJson = JSON.parse(ok.body);
    } catch {
      throw new Error("POST /json-echo should return valid JSON");
    }
    assert(
      JSON.stringify(okJson) === JSON.stringify(payload),
      "POST /json-echo should return the same JSON body"
    );

    const bad = await request({
      method: "POST",
      port,
      path: "/json-echo",
      headers: { "Content-Type": "application/json" },
      body: "{bad json",
    });
    assert(bad.status === 400, "Invalid JSON should return 400");
    assert(
      bad.body.includes("Invalid JSON"),
      "Invalid JSON response should contain 'Invalid JSON'"
    );

    const empty = await request({
      method: "POST",
      port,
      path: "/json-echo",
      headers: { "Content-Type": "application/json" },
      body: "",
    });
    assert(empty.status === 400, "Missing body should return 400");
  });
};
