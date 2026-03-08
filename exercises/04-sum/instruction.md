# 04 - 4.4 SUM ROUTE

Add a sum endpoint that uses query parameters.

## Requirements
- Use Node's `http` module.
- Listen on the port provided as the first command-line argument.
- Handle **GET /sum?a=<number>&b=<number>**:
  - Status: `200`
  - Body: JSON `{ "sum": <number> }`
- If `a` or `b` is missing/invalid:
  - Status: `400`
  - Body: JSON `{ "error": "Invalid numbers" }`

## Verify
```
eu-node-basics verify 4 sum_route.js
```

## Debug
Run your server manually:

```bash
node sum_route.js 3000
```

Then test the required cases:

```bash
curl -i "http://127.0.0.1:3000/sum?a=2&b=5"
curl -i "http://127.0.0.1:3000/sum?a=2"
```

Check:
- did the server start
- did you use `GET /sum` with query params
- do you return JSON for both success and error cases

## Reminder
After completing this step:

```
eu-node-basics
```

Then choose this exercise and select `Verify`.
