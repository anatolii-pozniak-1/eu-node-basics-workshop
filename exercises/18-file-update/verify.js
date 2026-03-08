const { request, assert } = require("../_lib/verify-helpers");
const { withTempFileServer } = require("../_lib/verify-file-helpers");
const fs = require("fs");

module.exports = async function verify(solutionPath) {
  const initial = [
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
  ];

  await withTempFileServer(solutionPath, initial, async ({ port, readDataJson, dataFile }) => {
    const badJson = await request({
      method: "PUT",
      port,
      path: "/data/2",
      headers: { "Content-Type": "application/json" },
      body: '{"name": ',
    });

    assert(badJson.status === 400, "PUT /data/:id with malformed JSON should return 400");

    const put = await request({
      method: "PUT",
      port,
      path: "/data/2",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated Two" }),
    });

    assert(put.status === 200, "PUT /data/:id should return 200");

    const data = readDataJson();
    const one = data.find((x) => Number(x.id) === 1);
    const two = data.find((x) => Number(x.id) === 2);

    assert(one && one.name === "One", "Other items should remain unchanged");
    assert(two && two.name === "Updated Two", "Matching item should be updated");

    fs.rmSync(dataFile, { force: true });
    const missingFile = await request({
      method: "PUT",
      port,
      path: "/data/2",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Another Name" }),
    });

    assert(missingFile.status === 500, "PUT /data/:id should return 500 when data.json is missing");
  });
};
