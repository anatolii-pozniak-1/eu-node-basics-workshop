# Підказка - JSON ECHO

* Читайте тіло запиту через:
  * `req.on("data", ...)`
  * `req.on("end", ...)`
* Обгорніть `JSON.parse(raw)` у `try/catch`.
* Для невалідного JSON або порожнього тіла поверніть `400`.
* Для успіху:
  * `res.statusCode = 200`
  * `res.setHeader("Content-Type", "application/json")`
  * `res.end(JSON.stringify(parsedBody))`
