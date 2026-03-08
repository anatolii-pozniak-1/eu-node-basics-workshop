# 01 - 4.1 ROOT ROUTE

Write a program that creates a minimal HTTP server with one route.

## REQUIREMENTS

Your program must:

* Use Node's built-in `http` module
* Listen on the port provided as the first command-line argument
* Handle the route `GET /`

When a client requests `GET /`, your server must:

* Respond with status code 200
* Set the header `Content-Type: text/plain`
* Send the response body:

```
Welcome to Manual HTTP Router
```

Other routes are not tested in this exercise.

## Debug
1. Run your solution manually:
```bash
node solution.js 3000
```
2. Open the matching `verify.js` for this exercise and inspect the exact requests/checks it performs.
3. Reproduce those requests manually with `curl` or your browser.
4. Add temporary `console.log(...)` statements if you need to inspect route, method, request body, or response data.
5. After local checks, run `eu-node-basics verify ...` again.
