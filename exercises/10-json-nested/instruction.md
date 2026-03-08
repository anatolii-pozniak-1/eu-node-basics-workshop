# 10 - 5.5 JSON NESTED

Write a program that processes nested JSON data.

## REQUIREMENTS

Your program must:

* Handle `POST /json-nested`
* Expect JSON body with:
  * `user` object
  * `user.name` (string)
  * `user.roles` (array)
* Return JSON:
  * `name`
  * `roleCount`
  * `isAdmin` (`true` if roles include `"admin"`)

## INPUT EXAMPLE

```json
{
  "user": {
    "name": "John",
    "roles": ["admin", "editor"]
  }
}
```

## OUTPUT EXAMPLE

```json
{
  "name": "John",
  "roleCount": 2,
  "isAdmin": true
}
```

## EDGE CASES

* Missing `user` -> `422`
* Missing `roles` -> `422`
* `roles` is not an array -> `422`

## VERIFY

To verify your solution, run:

```bash
eu-node-basics verify 10 json_nested.js
```

## Debug
1. Run your solution manually:
```bash
node json_nested.js 3000
```
2. Open the matching `verify.js` for this exercise and inspect the exact requests/checks it performs.
3. Reproduce those requests manually with `curl` or your browser.
4. Add temporary `console.log(...)` statements if you need to inspect route, method, request body, or response data.
5. After local checks, run `eu-node-basics verify ...` again.
