# Hint - STREAM TRANSFORM

* Parse `fileName` from query parameters.
* Build a local file path from that value.
* Use `fs.createReadStream(filePath)` for the source file.
* Create a custom `Transform` stream.
* In `transform(chunk, encoding, callback)`, push `chunk.toString().toUpperCase()`.
