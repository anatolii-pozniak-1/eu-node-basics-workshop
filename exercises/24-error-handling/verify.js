const { request, assert } = require("../_lib/verify-helpers");
const { withTempFixtureServer } = require("../_lib/verify-async-helpers");

module.exports = async function verify(solutionPath) {
  await withTempFixtureServer(
    solutionPath,
    { "a.txt": "A", "c.txt": "C" },
    async ({ port }) => {
      const bad = await request({
        method: "POST",
        port,
        path: "/error-handling",
        headers: { "Content-Type": "application/json" },
        body: '{"files":',
      });
      assert(bad.status === 400, "POST /error-handling with malformed JSON should return 400");

      const res = await request({
        method: "POST",
        port,
        path: "/error-handling",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(["a.txt", "missing.txt", "c.txt"]),
      });
      assert(res.status === 200, "POST /error-handling should return 200");

      let json;
      try {
        json = JSON.parse(res.body);
      } catch {
        throw new Error("POST /error-handling should return valid JSON");
      }

      assert(Array.isArray(json.successes), "successes should be an array");
      assert(Array.isArray(json.failures), "failures should be an array");
      assert(json.total === 3, "total should be 3");
      assert(json.successes.length === 2, "successes length should be 2");
      assert(json.failures.length === 1, "failures length should be 1");
    }
  );
};
