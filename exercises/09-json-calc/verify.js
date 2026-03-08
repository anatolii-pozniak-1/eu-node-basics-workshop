const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const multiply = await request({
      method: "POST",
      port,
      path: "/json-calc",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: 10, b: 5, operation: "multiply" }),
    });
    assert(multiply.status === 200, "Valid calc request should return 200");
    const multiplyJson = JSON.parse(multiply.body);
    assert(multiplyJson.result === 50, "multiply result should be 50");

    const add = await request({
      method: "POST",
      port,
      path: "/json-calc",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: 10, b: 5, operation: "add" }),
    });
    assert(add.status === 200, "Add request should return 200");
    assert(JSON.parse(add.body).result === 15, "add result should be 15");

    const invalidOp = await request({
      method: "POST",
      port,
      path: "/json-calc",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: 10, b: 5, operation: "pow" }),
    });
    assert(invalidOp.status === 400, "Invalid operation should return 400");

    const divZero = await request({
      method: "POST",
      port,
      path: "/json-calc",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: 10, b: 0, operation: "divide" }),
    });
    assert(divZero.status === 400, "Division by zero should return 400");

    const missingField = await request({
      method: "POST",
      port,
      path: "/json-calc",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: 10, operation: "add" }),
    });
    assert(missingField.status === 422, "Missing fields should return 422");
  });
};
