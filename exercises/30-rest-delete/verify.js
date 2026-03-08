const { request, assert } = require("../_lib/verify-helpers");
const { withTempFileServer } = require("../_lib/verify-file-helpers");

module.exports = async function verify(solutionPath) {
  const initial = [
    { id: 1, name: "Alpha" },
    { id: 2, name: "Beta" },
    { id: 3, name: "Gamma" },
  ];

  await withTempFileServer(solutionPath, initial, async ({ port, readDataJson }) => {
    const del = await request({ method: "DELETE", port, path: "/items/2" });
    assert(del.status === 200, "DELETE /items/:id should return 200 for existing item");

    const fileData = readDataJson();
    assert(fileData.length === 2, "data.json should contain 2 items after delete");
    assert(!fileData.some((x) => Number(x.id) === 2), "Deleted item should be removed");

    const missing = await request({ method: "DELETE", port, path: "/items/999" });
    assert(missing.status === 404, "DELETE /items/:id should return 404 when not found");
  });
};
