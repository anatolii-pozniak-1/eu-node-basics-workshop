# MANUAL HTTP ROUTER

Build a basic HTTP server **without any frameworks** and implement your own routing logic.

## Objective
Create a server that responds to different URL paths and HTTP methods.

## Requirements
Your program must:

1) Start an HTTP server with Node's built-in `http` module.
2) Listen on the port provided as the first command-line argument.
3) Implement the following routes:

- `GET /`
  - Status: `200`
  - Body: plain text `Welcome to Manual HTTP Router`

- `GET /time`
  - Status: `200`
  - Body: JSON `{ "now": "<ISO_TIMESTAMP>" }`
  - `ISO_TIMESTAMP` should be `new Date().toISOString()`

- `GET /echo?msg=hello`
  - Status: `200`
  - Body: plain text with the exact value of `msg` (empty string if missing)

- `GET /sum?a=2&b=5`
  - Status: `200`
  - Body: JSON `{ "sum": <number> }`
  - Зчитайте `a` і `b` з query-параметрів
  - Якщо числа відсутні або невалідні, поверніть статус `400` і JSON `{ "error": "Invalid numbers" }`

- Any other path or method
  - Status: `404`
  - Body: JSON `{ "error": "Not found" }`

## Notes
- Do not use external dependencies.
- Use `new URL(req.url, 'http://localhost')` to parse paths and query strings.
- Set content types appropriately (`text/plain` for text, `application/json` for JSON).

## Example
Run your solution like this:

```
node solution.js 3000
```

Then try:

```
curl http://localhost:3000/
curl http://localhost:3000/time
curl "http://localhost:3000/echo?msg=hello"
curl "http://localhost:3000/sum?a=2&b=5"
```

When you're ready:

```
eu-node-basics verify solution.js
```
