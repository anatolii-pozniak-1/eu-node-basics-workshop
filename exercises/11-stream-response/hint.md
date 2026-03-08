# Hint - STREAM FILE TO RESPONSE

* Parse `fileName` from query parameters.
* Build a local file path from that value.
* Create a readable stream with `fs.createReadStream(filePath)`.
* Set response status and headers before piping.
* Use `readStream.pipe(res)`.
* Listen for `error` on the stream to avoid crashes.
