const http = require("http");
const { spawn } = require("child_process");
const path = require("path");

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function request({ method, port, path: reqPath, body, headers }) {
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
    if (body) req.write(body);
    req.end();
  });
}

async function waitForServer(port) {
  const max = 30;
  for (let i = 0; i < max; i++) {
    try {
      await request({ method: "GET", port, path: "/" });
      return;
    } catch {
      await wait(100);
    }
  }
  throw new Error("Server did not start in time");
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

module.exports = async function verify(solutionPath) {
  const port = 3000 + Math.floor(Math.random() * 4000);
  const nodePath = process.execPath;
  const child = spawn(nodePath, [path.resolve(solutionPath), String(port)], {
    stdio: "ignore",
  });

  try {
    await waitForServer(port);

    // GET /
    const root = await request({ method: "GET", port, path: "/" });
    assert(root.status === 200, "GET / should return 200");
    assert(
      root.body.trim() === "Welcome to Manual HTTP Router",
      "GET / should return exact welcome text"
    );

    // GET /time
    const timeRes = await request({ method: "GET", port, path: "/time" });
    assert(timeRes.status === 200, "GET /time should return 200");
    let timeJson;
    try {
      timeJson = JSON.parse(timeRes.body);
    } catch {
      throw new Error("GET /time should return valid JSON");
    }
    assert(typeof timeJson.now === "string", "GET /time should include 'now'");
    assert(!Number.isNaN(Date.parse(timeJson.now)), "'now' must be ISO string");

    // GET /echo
    const echo = await request({
      method: "GET",
      port,
      path: "/echo?msg=hello",
    });
    assert(echo.status === 200, "GET /echo should return 200");
    assert(echo.body === "hello", "GET /echo should return msg text");

    // POST /sum valid
    const sum = await request({
      method: "POST",
      port,
      path: "/sum",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: 2, b: 5 }),
    });
    assert(sum.status === 200, "POST /sum should return 200");
    let sumJson;
    try {
      sumJson = JSON.parse(sum.body);
    } catch {
      throw new Error("POST /sum should return valid JSON");
    }
    assert(sumJson.sum === 7, "POST /sum should return correct sum");

    // POST /sum invalid JSON
    const bad = await request({
      method: "POST",
      port,
      path: "/sum",
      headers: { "Content-Type": "application/json" },
      body: "{bad json",
    });
    assert(bad.status === 400, "POST /sum invalid JSON should return 400");
    let badJson;
    try {
      badJson = JSON.parse(bad.body);
    } catch {
      throw new Error("POST /sum error should be JSON");
    }
    assert(
      badJson.error === "Invalid numbers",
      "POST /sum invalid JSON should return error message"
    );

    // 404
    const notFound = await request({ method: "GET", port, path: "/nope" });
    assert(notFound.status === 404, "Unknown route should return 404");
    let nfJson;
    try {
      nfJson = JSON.parse(notFound.body);
    } catch {
      throw new Error("404 response should be JSON");
    }
    assert(nfJson.error === "Not found", "404 JSON error message incorrect");
  } finally {
    child.kill();
  }
};
