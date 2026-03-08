# Hint - JSON OBJECT

* Parse request body JSON safely with `try/catch`.
* Validate before computing:
  * `typeof body.name === "string"`
  * `typeof body.age === "number"`
* If validation fails, return status `422`.
* Build response:
  * `greeting: "Hello " + body.name`
  * `isAdult: body.age >= 18`
