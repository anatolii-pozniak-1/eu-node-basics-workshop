const { request, assert } = require("../_lib/verify-helpers");
const { withTempFixtureServer } = require("../_lib/verify-async-helpers");

module.exports = async function verify(solutionPath) {
  const a = `A-${Math.random().toString(36).slice(2, 8)}`;
  const b = `B-${Math.random().toString(36).slice(2, 8)}`;
  const c = `C-${Math.random().toString(36).slice(2, 8)}`;
  const expectedCombined = `${a}${b}${c}`;

  await withTempFixtureServer(
    solutionPath,
    { "a.txt": a, "b.txt": b, "c.txt": c },
    async ({ port }) => {
      const wrongMethod = await request({ method: "POST", port, path: "/sequential" });
      assert(
        wrongMethod.status !== 200,
        "POST /sequential should not return 200"
      );

      const wrongPath = await request({ method: "GET", port, path: "/nope" });
      assert(
        wrongPath.status !== 200,
        "Unknown route should not return 200"
      );

      const res = await request({ method: "GET", port, path: "/sequential" });
      assert(res.status === 200, "GET /sequential should return 200");
      assert(
        String(res.headers["content-type"] || "").includes("application/json"),
        "GET /sequential should return application/json"
      );

      let json;
      try {
        json = JSON.parse(res.body);
      } catch {
        throw new Error("GET /sequential should return valid JSON");
      }

      assert(json.combined === expectedCombined, "combined should match sequential file content");
      assert(typeof json.elapsedMs === "number", "elapsedMs should be a number");
      assert(json.elapsedMs >= 0, "elapsedMs should be non-negative");
    }
  );
};
