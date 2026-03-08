# Hint - STREAM COUNTER

* Listen to `data` events on `req`.
* Increment `chunks` for each chunk.
* Add `chunk.length` to total `bytes`.
* Return JSON on `end`.
