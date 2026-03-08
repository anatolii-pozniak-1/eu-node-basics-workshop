# 09 - 5.4 JSON CALC

Write a program that performs dynamic math operations from JSON input.

## REQUIREMENTS

Your program must:

* Handle `POST /json-calc`
* Expect JSON body with:
  * `a` (number)
  * `b` (number)
  * `operation` (string: `add` | `subtract` | `multiply` | `divide`)
* Return JSON:
  * `result`

## INPUT EXAMPLE

```json
{
  "a": 10,
  "b": 5,
  "operation": "multiply"
}
```

## OUTPUT EXAMPLE

```json
{
  "result": 50
}
```

## EDGE CASES

* Invalid operation -> `400`
* Division by zero -> `400`
* Missing fields -> `422`

## VERIFY

To verify your solution, run:

```bash
eu-node-basics verify 9 json_calc.js
```

## Debug
1. Run your solution manually:
```bash
node json_calc.js 3000
```
2. Open the matching `verify.js` for this exercise and inspect the exact requests/checks it performs.
3. Reproduce those requests manually with `curl` or your browser.
4. Add temporary `console.log(...)` statements if you need to inspect route, method, request body, or response data.
5. After local checks, run `eu-node-basics verify ...` again.
