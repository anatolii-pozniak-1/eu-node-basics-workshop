# Hint - THREADPOOL LIMIT

* Use `crypto.pbkdf2` with `util.promisify`.
* Launch an array of tasks and await `Promise.all`.
* Measure total duration and return it in JSON.
