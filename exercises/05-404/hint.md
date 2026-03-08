# Hint - NOT FOUND ROUTE

- Keep known routes in `if/else if` checks.
- Final `else` is your fallback for unknown route/method.
- In fallback return:
  - `res.statusCode = 404`
  - `res.setHeader("Content-Type", "application/json")`
  - `res.end(JSON.stringify({ error: "Not found" }))`
