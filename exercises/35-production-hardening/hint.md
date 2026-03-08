# Hint - PRODUCTION HARDENING

* Add a helper to set common headers for every response.
* Wrap route handling in `try/catch`.
* For `/boom`, throw an error and catch it in centralized error path.
* Keep error response generic for clients (`Internal Server Error`).
* Handle CORS preflight:
  * if `req.method === "OPTIONS"` return `204` quickly.
* Use:
  * `const port = Number(process.env.PORT || 3000)`
