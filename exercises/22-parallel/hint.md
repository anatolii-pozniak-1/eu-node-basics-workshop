# Hint - PARALLEL READS

* Start timer with `const t0 = Date.now()`.
* Use `Promise.all([...])` with 3 `fs.promises.readFile` calls.
* Build `combined` from resolved results in deterministic order: a, b, c.
