# 13 - 8.3 STREAM TRANSFORM

Transform streamed file output before sending it.

## REQUIREMENTS

Your program must:

* Handle `GET /upper?fileName=<name>`
* Read the file from local disk (current working directory) as a stream
* Convert all text to uppercase while streaming
* Return status `200`
* If `fileName` is missing or file does not exist, return status `400`

## VERIFY

```bash
eu-node-basics verify 13 stream_transform.js
```

## Debug

Run your server manually:

```bash
echo "Hello Mixed Case" > file.txt
node stream_transform.js 3000
```

Then test both cases:

```bash
curl -i "http://127.0.0.1:3000/upper?fileName=file.txt"
curl -i "http://127.0.0.1:3000/upper"
```

Check:
* first request returns `200` with uppercase content
* second request returns `400`
