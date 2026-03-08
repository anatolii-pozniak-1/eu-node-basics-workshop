# 12 - 8.2 STREAM UPLOAD

Save request body into a file using a writable stream.

## REQUIREMENTS

Your program must:

* Handle `POST /upload`
* Use `fs.createWriteStream()`
* Save the request body into `upload.txt`
* Treat the incoming HTTP request body as the file content to save
* Return status `200`
* Any unknown route should return status `404`

## VERIFY

```bash
eu-node-basics verify 12 stream_upload.js
```

## Debug

Run your server manually:

```bash
node stream_upload.js 3000
```

Send file content in the POST request body:

```bash
curl -i -X POST http://127.0.0.1:3000/upload \
  -H "Content-Type: text/plain" \
  --data-binary "uploaded via stream"
```

Then check what was written:

```bash
cat upload.txt
```

Check:
* response status is `200`
* `upload.txt` exists
* `upload.txt` content matches the POST body exactly
