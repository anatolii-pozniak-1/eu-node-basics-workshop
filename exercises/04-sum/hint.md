# Hint - SUM ROUTE

- Match `GET /sum`.
- Parse URL with:
  - `const url = new URL(req.url, "http://localhost");`
- Read query params:
  - `const a = Number(url.searchParams.get("a"));`
  - `const b = Number(url.searchParams.get("b"));`
- Validate numbers:
  - `!Number.isNaN(a) && !Number.isNaN(b)`
- Success response: `200` + `{ "sum": a + b }`.
- Error response: `400` + `{ "error": "Invalid numbers" }`.
