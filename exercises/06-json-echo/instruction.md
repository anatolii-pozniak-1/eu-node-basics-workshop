# 06 - 5.1 JSON ECHO

Write a program that handles a JSON echo endpoint.

## REQUIREMENTS

Your program must:

* Handle `POST /json-echo`
* Parse the request body as JSON
* Respond with the same JSON object
* Set header `Content-Type: application/json`
* Return status `200`

## INPUT EXAMPLE

```json
{
  "message": "Hello"
}
```

## OUTPUT EXAMPLE

```json
{
  "message": "Hello"
}
```

## EDGE CASES

* Invalid JSON -> return `400` with message `Invalid JSON`
* Missing body -> return `400`

## VERIFY

To verify your solution, run:

```bash
eu-node-basics verify 6 json_echo.js
```

## Debug
1. Run your solution manually:
```bash
node json_echo.js 3000
```
2. Open the matching `verify.js` for this exercise and inspect the exact requests/checks it performs.
3. Reproduce those requests manually with `curl` or your browser.
4. Add temporary `console.log(...)` statements if you need to inspect route, method, request body, or response data.
5. After local checks, run `eu-node-basics verify ...` again.
