const { request, assert } = require("../_lib/verify-helpers");
const { withTempFileServer } = require("../_lib/verify-file-helpers");

module.exports = async function verify(solutionPath) {
  const initial = [
    { id: 1, name: "Alpha" },
    { id: 2, name: "Beta" },
  ];

  await withTempFileServer(solutionPath, initial, async ({ port, readDataJson }) => {
    const put = await request({
      method: "PUT",
      port,
      path: "/items/2",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated Beta" }),
    });

    assert(put.status === 200, "PUT /items/:id should return 200 for existing item");

    let putJson;
    try {
      putJson = JSON.parse(put.body);
    } catch {
      throw new Error("PUT /items/:id should return valid JSON");
    }
    assert(putJson.id === 2, "Updated item id should be 2");
    assert(putJson.name === "Updated Beta", "Updated item name should match");

    const fileData = readDataJson();
    const updated = fileData.find((x) => Number(x.id) === 2);
    assert(updated && updated.name === "Updated Beta", "data.json should persist update");

    const missing = await request({
      method: "PUT",
      port,
      path: "/items/999",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Nope" }),
    });
    assert(missing.status === 404, "PUT /items/:id should return 404 when not found");
  });
};
