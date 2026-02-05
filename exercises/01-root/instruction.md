# 01 - ROOT ROUTE

Implement a minimal HTTP server with a **single route**.

## Requirements
- Use Node's `http` module.
- Listen on the port provided as the first command-line argument.
- Handle **GET /**:
  - Status: `200`
  - Body: plain text `Welcome to Manual HTTP Router`

Other routes can respond anything (they are not tested yet).

## Run
```
node solution.js 3000
```

## Verify
```
manual-http-router verify 1 solution.js
```

## Reminder
After completing this step, run:

```
manual-http-router verify 1 solution.js
manual-http-router list
```
