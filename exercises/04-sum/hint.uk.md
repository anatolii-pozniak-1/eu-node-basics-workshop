# Підказка - SUM ROUTE

* Обробіть `GET /sum`.
* Розберіть URL через:
  * `const url = new URL(req.url, "http://localhost");`
* Зчитайте query-параметри:
  * `const a = Number(url.searchParams.get("a"));`
  * `const b = Number(url.searchParams.get("b"));`
* Перевірте, що обидва значення є числами:
  * `!Number.isNaN(a) && !Number.isNaN(b)`
* Для успіху поверніть `200` і `{ "sum": a + b }`.
* Для помилки поверніть `400` і `{ "error": "Invalid numbers" }`.
