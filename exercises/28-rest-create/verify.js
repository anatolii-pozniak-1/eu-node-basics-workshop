const { request, assert } = require("../_lib/verify-helpers");
const { withTempFileServer } = require("../_lib/verify-file-helpers");

module.exports = async function verify(solutionPath) {
  const initial = [{ id: 1, name: "Alpha" }];
  const payload = { id: 2, name: "Beta" };

  await withTempFileServer(solutionPath, initial, async ({ port, readDataJson }) => {
    const post = await request({
      method: "POST",
      port,
      path: "/items",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    assert(post.status === 201, "POST /items should return 201");

    let postJson;
    try {
      postJson = JSON.parse(post.body);
    } catch {
      throw new Error("POST /items should return valid JSON");
    }

    assert(postJson.id === 2, "Created item id should be 2");
    assert(postJson.name === "Beta", "Created item name should be Beta");

    const fileData = readDataJson();
    assert(fileData.length === 2, "data.json should contain appended item");
    assert(fileData.some((x) => Number(x.id) === 2), "Appended item should be in data.json");
  });
};
