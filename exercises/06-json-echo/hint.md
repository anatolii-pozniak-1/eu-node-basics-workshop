# Hint - JSON ECHO

* Read body data with:
  * `req.on("data", ...)`
  * `req.on("end", ...)`
* Use `try/catch` around `JSON.parse(raw)`.
* For invalid JSON or empty body, return status `400`.
* For success:
  * `res.statusCode = 200`
  * `res.setHeader("Content-Type", "application/json")`
  * `res.end(JSON.stringify(parsedBody))`
