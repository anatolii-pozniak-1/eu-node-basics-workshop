# Підказка - ECHO ROUTE

* Розберіть URL через `new URL(req.url, "http://localhost")`.
* Перевірте `url.pathname === "/echo"`.
* Візьміть `msg` через `url.searchParams.get("msg") || ""`.
* Поверніть plain text зі статусом `200`.
