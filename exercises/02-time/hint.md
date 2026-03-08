# Hint - TIME ROUTE

- Reuse your server from exercise 01.
- Match `GET /time`.
- Build payload with:
  - `const data = { now: new Date().toISOString() };`
- Respond as JSON:
  - `res.statusCode = 200`
  - `res.setHeader("Content-Type", "application/json")`
  - `res.end(JSON.stringify(data))`
