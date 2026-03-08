# Hint - ECHO ROUTE

- Parse URL with:
  - `const url = new URL(req.url, "http://localhost");`
- Match `GET /echo` with `url.pathname`.
- Read query param:
  - `const msg = url.searchParams.get("msg") || "";`
- Respond as plain text with status `200` and `res.end(msg)`.
