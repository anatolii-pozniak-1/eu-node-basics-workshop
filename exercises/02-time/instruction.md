# 02 - 4.2 TIME ROUTE

Add a JSON time endpoint.

## Requirements
- Use Node's `http` module.
- Listen on the port provided as the first command-line argument.
- Handle **GET /time**:
  - Status: `200`
  - Body: JSON `{ "now": "<ISO_TIMESTAMP>" }`
  - `ISO_TIMESTAMP` must be `new Date().toISOString()`

## Verify
```
eu-node-basics verify 2 time_route.js
```

## Debug
1. Run your solution manually:
```bash
node time_route.js 3000
```
2. Open the matching `verify.js` for this exercise and inspect the exact requests/checks it performs.
3. Reproduce those requests manually with `curl` or your browser.
4. Add temporary `console.log(...)` statements if you need to inspect route, method, request body, or response data.
5. After local checks, run `eu-node-basics verify ...` again.

## Reminder
After completing this step:

```
eu-node-basics
```

Then choose this exercise and select `Verify`.
