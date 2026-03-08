const { request, assert } = require("../_lib/verify-helpers");
const { withTempFixtureServer } = require("../_lib/verify-async-helpers");

module.exports = async function verify(solutionPath) {
  const a = `A-${Math.random().toString(36).slice(2, 8)}`;
  const b = `B-${Math.random().toString(36).slice(2, 8)}`;
  const c = `C-${Math.random().toString(36).slice(2, 8)}`;

  await withTempFixtureServer(
    solutionPath,
    { "a.txt": a, "b.txt": b, "c.txt": c },
    async ({ port }) => {
      const wrongMethod = await request({ method: "POST", port, path: "/parallel" });
      assert(wrongMethod.status !== 200, "POST /parallel should not return 200");

      const wrongPath = await request({ method: "GET", port, path: "/nope" });
      assert(wrongPath.status !== 200, "Unknown route should not return 200");

      const res = await request({ method: "GET", port, path: "/parallel" });
      assert(res.status === 200, "GET /parallel should return 200");
      assert(
        String(res.headers["content-type"] || "").includes("application/json"),
        "GET /parallel should return application/json"
      );

      let json;
      try {
        json = JSON.parse(res.body);
      } catch {
        throw new Error("GET /parallel should return valid JSON");
      }

      assert(
        json.combined === `${a}${b}${c}`,
        "combined should match a.txt+b.txt+c.txt content order"
      );
      assert(typeof json.elapsedMs === "number", "elapsedMs should be a number");
      assert(json.elapsedMs >= 0, "elapsedMs should be non-negative");
    }
  );
};
