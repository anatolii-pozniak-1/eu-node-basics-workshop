# Hint - STREAM ERRORS

* Parse `fileName` from query parameters.
* Create the read stream before piping.
* Attach an `error` listener.
* On error, send a `500` response with a safe message like `Internal Server Error`.
