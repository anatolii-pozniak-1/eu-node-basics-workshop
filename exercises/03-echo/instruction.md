# 03 - ECHO ROUTE

Add a query-string echo endpoint.

## Requirements
- Use Node's `http` module.
- Listen on the port provided as the first command-line argument.
- Handle **GET /echo?msg=hello**:
  - Status: `200`
  - Body: plain text equal to the `msg` value
  - If `msg` is missing, return empty string

## Verify
```
manual-http-router verify 3 solution.js
```

## Reminder
After completing this step, run:

```
manual-http-router verify 3 solution.js
manual-http-router list
```
