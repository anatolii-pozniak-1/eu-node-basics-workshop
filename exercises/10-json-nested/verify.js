const { request, assert, withServer } = require("../_lib/verify-helpers");

module.exports = async function verify(solutionPath) {
  await withServer(solutionPath, async (port) => {
    const ok = await request({
      method: "POST",
      port,
      path: "/json-nested",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: { name: "John", roles: ["admin", "editor"] },
      }),
    });
    assert(ok.status === 200, "POST /json-nested should return 200");
    const okJson = JSON.parse(ok.body);
    assert(okJson.name === "John", "name should be John");
    assert(okJson.roleCount === 2, "roleCount should be 2");
    assert(okJson.isAdmin === true, "isAdmin should be true");

    const nonAdmin = await request({
      method: "POST",
      port,
      path: "/json-nested",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: { name: "Mary", roles: ["editor"] },
      }),
    });
    assert(nonAdmin.status === 200, "Valid nested body should return 200");
    const nonAdminJson = JSON.parse(nonAdmin.body);
    assert(nonAdminJson.isAdmin === false, "isAdmin should be false");

    const missingUser = await request({
      method: "POST",
      port,
      path: "/json-nested",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert(missingUser.status === 422, "Missing user should return 422");

    const missingRoles = await request({
      method: "POST",
      port,
      path: "/json-nested",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { name: "John" } }),
    });
    assert(missingRoles.status === 422, "Missing roles should return 422");

    const badRoles = await request({
      method: "POST",
      port,
      path: "/json-nested",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { name: "John", roles: "admin" } }),
    });
    assert(badRoles.status === 422, "roles not array should return 422");
  });
};
