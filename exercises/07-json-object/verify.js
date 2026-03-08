const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const ok = await request({
      method: "POST",
      port,
      path: "/json-object",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Anatolii", age: 30 }),
    });
    assert(ok.status === 200, "POST /json-object should return 200");

    let okJson;
    try {
      okJson = JSON.parse(ok.body);
    } catch {
      throw new Error("POST /json-object should return valid JSON");
    }
    assert(okJson.greeting === "Hello Anatolii", "Greeting is incorrect");
    assert(okJson.isAdult === true, "isAdult should be true for age 30");

    const minor = await request({
      method: "POST",
      port,
      path: "/json-object",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Alex", age: 17 }),
    });
    assert(minor.status === 200, "Valid body should return 200");
    const minorJson = JSON.parse(minor.body);
    assert(minorJson.isAdult === false, "isAdult should be false for age 17");

    const missingName = await request({
      method: "POST",
      port,
      path: "/json-object",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age: 30 }),
    });
    assert(missingName.status === 422, "Missing name should return 422");

    const missingAge = await request({
      method: "POST",
      port,
      path: "/json-object",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Anatolii" }),
    });
    assert(missingAge.status === 422, "Missing age should return 422");

    const badAge = await request({
      method: "POST",
      port,
      path: "/json-object",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Anatolii", age: "30" }),
    });
    assert(badAge.status === 422, "Non-number age should return 422");
  });
};
