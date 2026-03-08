const { request, assert } = require("../_lib/verify-helpers");
const { withTempFileServer } = require("../_lib/verify-file-helpers");

module.exports = async function verify(solutionPath) {
  const initial = [{ id: 1, name: "Old" }];
  const payload = [{ id: 1, name: "New" }, { id: 2, name: "Next" }];

  await withTempFileServer(solutionPath, initial, async ({ port, readDataJson }) => {
    const post = await request({
      method: "POST",
      port,
      path: "/data",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    assert(post.status === 200, "POST /data should return 200");

    const fileData = readDataJson();
    assert(
      JSON.stringify(fileData) === JSON.stringify(payload),
      "POST /data should write request JSON into data.json"
    );
  });
};
