const { request, assert } = require("../_lib/verify-helpers");
const { withTempFileServer } = require("../_lib/verify-file-helpers");
const fs = require("fs");

module.exports = async function verify(solutionPath) {
  const initial = {
    items: [
      { id: 1, name: "Alpha" },
      { id: 2, name: "Beta" },
    ],
  };

  await withTempFileServer(solutionPath, initial, async ({ port, dataFile }) => {
    const res = await request({ method: "GET", port, path: "/data" });
    assert(res.status === 200, "GET /data should return 200");
    assert(
      String(res.headers["content-type"] || "").includes("application/json"),
      "GET /data should return application/json"
    );

    let json;
    try {
      json = JSON.parse(res.body);
    } catch {
      throw new Error("GET /data should return valid JSON");
    }

    assert(
      json && typeof json === "object" && !Array.isArray(json),
      "GET /data should return a JSON object (not a JSON array)"
    );

    assert(
      JSON.stringify(json) === JSON.stringify(initial),
      "GET /data should return file content exactly"
    );

    // Additional negative case: invalid JSON in file should not return 200.
    fs.writeFileSync(dataFile, "{ invalid json");
    const badRes = await request({ method: "GET", port, path: "/data" });
    assert(
      badRes.status === 400 || badRes.status === 500,
      "GET /data with invalid data.json should return 400 or 500"
    );
  });
};
