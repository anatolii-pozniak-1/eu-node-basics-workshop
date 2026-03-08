const http = require("http");
const { spawn } = require("child_process");
const path = require("path");
const { assert } = require("../_lib/verify-helpers");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function request(port, reqPath = "/") {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        method: "GET",
        hostname: "127.0.0.1",
        port,
        path: reqPath,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function waitForServer(port) {
  for (let i = 0; i < 30; i++) {
    try {
      await request(port, "/");
      return;
    } catch {
      await wait(100);
    }
  }
  throw new Error("Server did not start from process.env.PORT in time");
}

module.exports = async function verify(solutionPath) {
  const port = 7000 + Math.floor(Math.random() * 1000);
  const child = spawn(process.execPath, [path.resolve(solutionPath)], {
    stdio: "ignore",
    env: { ...process.env, PORT: String(port) },
  });

  try {
    await waitForServer(port);
    const res = await request(port, "/");
    assert(res.status === 200, "GET / should return 200 when using env PORT");
  } finally {
    child.kill();
  }
};
