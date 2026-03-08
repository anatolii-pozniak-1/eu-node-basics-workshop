# Hint - JSON ARRAY

* Validate:
  * `Array.isArray(body.numbers)`
  * every item is `typeof n === "number"`
* Sum values with `reduce`.
* For empty array:
  * `count = 0`
  * `sum = 0`
  * `average = 0`
* Return status `422` when validation fails.
