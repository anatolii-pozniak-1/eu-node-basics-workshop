const { request, assert } = require("../_lib/verify-helpers");
const { withTempFileServer } = require("../_lib/verify-file-helpers");

module.exports = async function verify(solutionPath) {
  const initial = [
    { id: 1, name: "Alpha" },
    { id: 2, name: "Beta" },
  ];

  await withTempFileServer(solutionPath, initial, async ({ port }) => {
    const ok = await request({ method: "GET", port, path: "/items/2" });
    assert(ok.status === 200, "GET /items/:id should return 200 for existing item");

    let okJson;
    try {
      okJson = JSON.parse(ok.body);
    } catch {
      throw new Error("GET /items/:id should return valid JSON");
    }
    assert(okJson.id === 2, "GET /items/2 should return item with id=2");
    assert(okJson.name === "Beta", "GET /items/2 should return correct item");

    const missing = await request({ method: "GET", port, path: "/items/999" });
    assert(missing.status === 404, "GET /items/:id should return 404 for missing item");
  });
};
