# 04 - SUM ROUTE

Add a JSON POST endpoint.

## Requirements
- Use Node's `http` module.
- Listen on the port provided as the first command-line argument.
- Handle **POST /sum** with JSON body `{ "a": number, "b": number }`:
  - Status: `200`
  - Body: JSON `{ "sum": <number> }`
- If JSON is invalid OR numbers missing/invalid:
  - Status: `400`
  - Body: JSON `{ "error": "Invalid numbers" }`

## Verify
```
manual-http-router verify 4 solution.js
```

## Reminder
After completing this step, run:

```
manual-http-router verify 4 solution.js
manual-http-router list
```
