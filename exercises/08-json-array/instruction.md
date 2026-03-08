# 08 - 5.3 JSON ARRAY

Write a program that processes an array of numbers.

## REQUIREMENTS

Your program must:

* Handle `POST /json-array`
* Expect JSON body with:
  * `numbers`: array of numbers
* Return JSON:
  * `count`
  * `sum`
  * `average`

## INPUT EXAMPLE

```json
{
  "numbers": [1, 2, 3, 4]
}
```

## OUTPUT EXAMPLE

```json
{
  "count": 4,
  "sum": 10,
  "average": 2.5
}
```

## EDGE CASES

* Empty array -> `count: 0`, `sum: 0`, `average: 0`
* Non-numeric values -> `422`
* Missing `numbers` -> `422`

## VERIFY

To verify your solution, run:

```bash
eu-node-basics verify 8 json_array.js
```

## Debug
1. Run your solution manually:
```bash
node json_array.js 3000
```
2. Open the matching `verify.js` for this exercise and inspect the exact requests/checks it performs.
3. Reproduce those requests manually with `curl` or your browser.
4. Add temporary `console.log(...)` statements if you need to inspect route, method, request body, or response data.
5. After local checks, run `eu-node-basics verify ...` again.
