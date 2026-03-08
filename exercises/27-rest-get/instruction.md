# 27 - 9.2 REST GET BY ID

Implement a route to get one resource by id.

## REQUIREMENTS

Your program must:

* Handle `GET /items/:id`
* Read from `data.json`
* Return matching item as JSON with status `200`
* If item is missing, return `404`

## VERIFY

```bash
eu-node-basics verify 27 rest_get_by_id.js
```

## Debug
1. Run your solution manually:
```bash
node rest_get_by_id.js 3000
```
2. Open the matching `verify.js` for this exercise and inspect the exact requests/checks it performs.
3. Reproduce those requests manually with `curl` or your browser.
4. Add temporary `console.log(...)` statements if you need to inspect route, method, request body, or response data.
5. After local checks, run `eu-node-basics verify ...` again.
