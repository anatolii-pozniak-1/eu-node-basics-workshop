# Підказка - ROOT ROUTE

* Почніть із `http.createServer((req, res) => { ... })`.
* Перевіряйте маршрут за методом і шляхом:
  * `req.method === "GET"`
  * `req.url === "/"`
* Для успішної відповіді:
  * `res.statusCode = 200`
  * `res.setHeader("Content-Type", "text/plain")`
  * `res.end("Welcome to Manual HTTP Router")`
