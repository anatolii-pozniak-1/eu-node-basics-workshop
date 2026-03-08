# Hint - ROOT ROUTE

- Start with `http.createServer((req, res) => { ... })`.
- Check route using both method and path:
  - `req.method === "GET"`
  - `req.url === "/"`
- For the success response:
  - `res.statusCode = 200`
  - `res.setHeader("Content-Type", "text/plain")`
  - `res.end("Welcome to Manual HTTP Router")`
