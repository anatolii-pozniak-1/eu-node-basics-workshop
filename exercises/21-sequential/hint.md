# Hint - SEQUENTIAL FILE READS

* Use `await` one file at a time.
* Start timer with `const t0 = Date.now()`.
* Build `combined` from file contents in read order.
* Return `elapsedMs: Date.now() - t0`.
