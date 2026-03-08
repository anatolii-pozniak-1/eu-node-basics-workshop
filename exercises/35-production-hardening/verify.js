const http = require("http");
const { spawn } = require("child_process");
const path = require("path");
const { assert } = require("../_lib/verify-helpers");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function request({ method, port, reqPath, headers }) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        method,
        hostname: "127.0.0.1",
        port,
        path: reqPath,
        headers,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function waitForServer(port) {
  for (let i = 0; i < 30; i++) {
    try {
      await request({ method: "GET", port, reqPath: "/health" });
      return;
    } catch {
      await wait(100);
    }
  }
  throw new Error("Server did not start in time");
}

function assertSecurityHeaders(res) {
  assert(
    String(res.headers["x-content-type-options"] || "").toLowerCase() === "nosniff",
    "Missing or invalid X-Content-Type-Options header"
  );
  assert(
    String(res.headers["x-frame-options"] || "").toUpperCase() === "DENY",
    "Missing or invalid X-Frame-Options header"
  );
  assert(
    String(res.headers["referrer-policy"] || "").toLowerCase() === "no-referrer",
    "Missing or invalid Referrer-Policy header"
  );
}

module.exports = async function verify(solutionPath) {
  const port = 7100 + Math.floor(Math.random() * 500);
  const child = spawn(process.execPath, [path.resolve(solutionPath)], {
    stdio: "ignore",
    env: { ...process.env, PORT: String(port) },
  });

  try {
    await waitForServer(port);

    const health = await request({ method: "GET", port, reqPath: "/health" });
    assert(health.status === 200, "GET /health should return 200");
    let healthJson;
    try {
      healthJson = JSON.parse(health.body);
    } catch {
      throw new Error("GET /health should return valid JSON");
    }
    assert(healthJson.ok === true, "GET /health should return { ok: true }");
    assertSecurityHeaders(health);
    assert(
      Boolean(health.headers["access-control-allow-origin"]),
      "Missing Access-Control-Allow-Origin header"
    );

    const preflight = await request({
      method: "OPTIONS",
      port,
      reqPath: "/health",
      headers: {
        Origin: "http://example.com",
        "Access-Control-Request-Method": "GET",
      },
    });
    assert(preflight.status === 204, "OPTIONS /health should return 204");

    const boom = await request({ method: "GET", port, reqPath: "/boom" });
    assert(boom.status === 500, "GET /boom should return 500");
    assert(
      boom.body.includes("Internal Server Error"),
      "GET /boom should return safe error message"
    );
    assertSecurityHeaders(boom);

    const afterError = await request({ method: "GET", port, reqPath: "/health" });
    assert(
      afterError.status === 200,
      "Server should stay alive after /boom (health should still return 200)"
    );
  } finally {
    child.kill();
  }
};
