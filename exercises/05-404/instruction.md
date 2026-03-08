# 05 - 4.5 NOT FOUND ROUTE

Add a 404 handler for unknown routes.

## Requirements
- Use Node's `http` module.
- Listen on the port provided as the first command-line argument.
- For any unknown path or method:
  - Status: `404`
  - Body: JSON `{ "error": "Not found" }`

## Verify
```
eu-node-basics verify 5 not_found_route.js
```

## Debug
1. Run your solution manually:
```bash
node not_found_route.js 3000
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
