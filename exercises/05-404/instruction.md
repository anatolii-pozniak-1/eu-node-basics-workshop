# 05 - NOT FOUND ROUTE

Add a 404 handler for unknown routes.

## Requirements
- Use Node's `http` module.
- Listen on the port provided as the first command-line argument.
- For any unknown path or method:
  - Status: `404`
  - Body: JSON `{ "error": "Not found" }`

## Verify
```
manual-http-router verify 5 solution.js
```

## Reminder
After completing this step, run:

```
manual-http-router verify 5 solution.js
manual-http-router list
```
