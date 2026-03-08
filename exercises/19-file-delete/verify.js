const { request, assert } = require("../_lib/verify-helpers");
const { withTempFileServer } = require("../_lib/verify-file-helpers");
const fs = require("fs");

module.exports = async function verify(solutionPath) {
  const initial = [
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
    { id: 3, name: "Three" },
  ];

  await withTempFileServer(solutionPath, initial, async ({ port, readDataJson, dataFile }) => {
    fs.writeFileSync(dataFile, "{ malformed json");
    const malformed = await request({ method: "DELETE", port, path: "/data/2" });
    assert(malformed.status === 400, "DELETE /data/:id should return 400 for malformed data.json");

    fs.writeFileSync(dataFile, JSON.stringify(initial, null, 2));

    const notFound = await request({ method: "DELETE", port, path: "/data/999" });
    assert(notFound.status === 404, "DELETE /data/:id should return 404 when id is not found");

    const del = await request({ method: "DELETE", port, path: "/data/2" });
    assert(del.status === 200, "DELETE /data/:id should return 200");

    const data = readDataJson();
    assert(data.length === 2, "data.json should contain 2 items after delete");
    assert(!data.some((x) => Number(x.id) === 2), "Item id=2 should be removed");

    fs.rmSync(dataFile, { force: true });
    const missing = await request({ method: "DELETE", port, path: "/data/1" });
    assert(missing.status === 500, "DELETE /data/:id should return 500 when data.json is missing");
  });
};
