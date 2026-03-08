# Підказка - FILE WRITE

* Читайте тіло через `req.on("data")` + `req.on("end")`.
* Парсьте JSON у `try/catch`.
* Зберігайте через `fs.writeFile` / `fs.writeFileSync`.
