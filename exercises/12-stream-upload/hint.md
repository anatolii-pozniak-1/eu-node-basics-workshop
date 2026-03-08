# Hint - STREAM UPLOAD

* Create a writable stream for `upload.txt`.
* Pipe the incoming request stream into the file stream.
* Finish the HTTP response only after the file stream emits `finish`.
