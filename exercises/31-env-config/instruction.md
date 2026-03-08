# 31 - 10.1 ENV CONFIG

Use environment variables for server configuration.

## REQUIREMENTS

Your program must:

* Use `process.env.PORT` as the server port
* Start an HTTP server even when no CLI port argument is provided
* Handle `GET /` and return status `200`

## VERIFY

Pass your server file path to verify:

```bash
eu-node-basics verify 31 env_config.js
```

## Debug
1. Run your solution manually:
```bash
node env_config.js 3000
```
2. Open the matching `verify.js` for this exercise and inspect the exact requests/checks it performs.
3. Reproduce those requests manually with `curl` or your browser.
4. Add temporary `console.log(...)` statements if you need to inspect route, method, request body, or response data.
5. After local checks, run `eu-node-basics verify ...` again.
