# Підказка - JSON OBJECT

* Безпечно парсьте JSON у `try/catch`.
* Перед обчисленням перевіряйте:
  * `typeof body.name === "string"`
  * `typeof body.age === "number"`
* Якщо валідація не пройдена, повертайте статус `422`.
* Формуйте відповідь:
  * `greeting: "Hello " + body.name`
  * `isAdult: body.age >= 18`
