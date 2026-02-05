# 02 - TIME ROUTE

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
manual-http-router verify 2 solution.js
```

## Reminder
After completing this step, run:

```
manual-http-router verify 2 solution.js
manual-http-router list
```
