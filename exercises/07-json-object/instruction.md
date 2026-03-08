# 07 - 5.2 JSON OBJECT

Write a program that processes object properties from JSON input.

## REQUIREMENTS

Your program must:

* Handle `POST /json-object`
* Expect JSON body with:
  * `name` (string)
  * `age` (number)
* Return JSON:
  * `greeting`: `"Hello <name>"`
  * `isAdult`: `true` if `age >= 18`, else `false`

## INPUT EXAMPLE

```json
{
  "name": "Anatolii",
  "age": 30
}
```

## OUTPUT EXAMPLE

```json
{
  "greeting": "Hello Anatolii",
  "isAdult": true
}
```

## EDGE CASES

* Missing `name` -> `422`
* Missing `age` -> `422`
* `age` is not a number -> `422`

## VERIFY

To verify your solution, run:

```bash
eu-node-basics verify 7 json_object.js
```

## Debug
1. Run your solution manually:
```bash
node json_object.js 3000
```
2. Open the matching `verify.js` for this exercise and inspect the exact requests/checks it performs.
3. Reproduce those requests manually with `curl` or your browser.
4. Add temporary `console.log(...)` statements if you need to inspect route, method, request body, or response data.
5. After local checks, run `eu-node-basics verify ...` again.
