# 15 - 8.5 STREAM ERRORS

Handle stream errors gracefully.

## REQUIREMENTS

Your program must:

* Handle `GET /missing-file?fileName=<name>`
* Read file name from query parameter `fileName`
* Try to stream that local file
* Return status `500`
* Return a safe error message
* Keep the server alive after the error
* If `fileName` is missing, return status `400`

## VERIFY

```bash
eu-node-basics verify 15 stream_errors.js
```
