# Підказка - JSON NESTED

* Перевірте вкладену структуру перед доступом до полів:
  * `body && typeof body === "object"`
  * `body.user && typeof body.user === "object"`
  * `typeof body.user.name === "string"`
  * `Array.isArray(body.user.roles)`
* Обчисліть:
  * `name = body.user.name`
  * `roleCount = body.user.roles.length`
  * `isAdmin = body.user.roles.includes("admin")`
* Якщо потрібні вкладені поля відсутні або невалідні, поверніть `422`.
