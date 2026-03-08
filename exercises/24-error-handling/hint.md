# Hint - HANDLE PARTIAL FAILURES

* `Promise.all` fails fast; `Promise.allSettled` does not.
* Parse request body as JSON array of file names.
* Map settled results into `successes` and `failures`.
* Keep API stable even with missing files.
