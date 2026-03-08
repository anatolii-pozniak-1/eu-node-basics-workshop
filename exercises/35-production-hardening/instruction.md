# 35 - 10.3 PRODUCTION HARDENING

Make your Node.js server safer for production-like usage.

## REQUIREMENTS

Your program must:

* Start server using `process.env.PORT`
* Handle `GET /health` and return JSON:
  * `{ "ok": true }`
* Handle `GET /boom` by throwing (or simulating) an internal error and returning:
  * status `500`
  * body containing `Internal Server Error`
* Keep server alive after handling `/boom`
* Add security headers on responses:
  * `X-Content-Type-Options: nosniff`
  * `X-Frame-Options: DENY`
  * `Referrer-Policy: no-referrer`
* Add CORS support:
  * `Access-Control-Allow-Origin` header on normal responses
  * Handle `OPTIONS /health` with status `204`

## VERIFY

Pass your server file path to verify:

```bash
eu-node-basics verify 35 production_hardening.js
```

## Debug
1. Run your solution manually:
```bash
node production_hardening.js 3000
```
2. Open the matching `verify.js` for this exercise and inspect the exact requests/checks it performs.
3. Reproduce those requests manually with `curl` or your browser.
4. Add temporary `console.log(...)` statements if you need to inspect route, method, request body, or response data.
5. After local checks, run `eu-node-basics verify ...` again.
