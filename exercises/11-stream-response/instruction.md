# 11 - 8.1 STREAM FILE TO RESPONSE

Stream a local file into an HTTP response.

## REQUIREMENTS

Your program must:

* Handle `GET /file?fileName=<name>`
* Use `fs.createReadStream()`
* Read the file from local disk (current working directory)
* Pipe file content into the HTTP response
* Return status `200`
* Set response header `Content-Type: text/plain; charset=utf-8`
* If `fileName` is missing or file does not exist, return status `400`

## VERIFY

```bash
eu-node-basics verify 11 stream_response.js
```

## Debug

Run your server manually:

```bash
echo "Hello stream response" > file.txt
node stream_response.js 3000
curl -i "http://127.0.0.1:3000/file?fileName=file.txt"
```

Check:
* status is `200`
* response body matches `file.txt` content
