# Підказка - NOT FOUND ROUTE

* Після обробки відомих маршрутів додайте fallback-гілку.
* У fallback поверніть:
  * `res.statusCode = 404`
  * `Content-Type: application/json`
  * `{"error":"Not found"}`
