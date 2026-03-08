# Hint - JSON NESTED

* Validate nested structure before reading properties:
  * `body && typeof body === "object"`
  * `body.user && typeof body.user === "object"`
  * `typeof body.user.name === "string"`
  * `Array.isArray(body.user.roles)`
* Compute:
  * `name = body.user.name`
  * `roleCount = body.user.roles.length`
  * `isAdmin = body.user.roles.includes("admin")`
* Return `422` when required nested fields are missing/invalid.
