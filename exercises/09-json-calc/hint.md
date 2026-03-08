# Hint - JSON CALC

* Validate required fields first (`a`, `b`, `operation`).
* Return `422` if any required field is missing or wrong type.
* Use `switch` on `operation`:
  * `add`, `subtract`, `multiply`, `divide`
* Return `400` for:
  * unknown operation
  * divide by zero
