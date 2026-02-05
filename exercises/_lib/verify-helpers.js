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

async function withServer(solutionPath, fn) {
  const port = 3000 + Math.floor(Math.random() * 4000);
  const nodePath = process.execPath;
  const child = spawn(nodePath, [path.resolve(solutionPath), String(port)], {
    stdio: "ignore",
  });

  try {
    await waitForServer(port);
    await fn(port);
  } finally {
    child.kill();
  }
}

module.exports = {
  request,
  waitForServer,
  assert,
  withServer,
};
