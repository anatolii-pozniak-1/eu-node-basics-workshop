# 17 - 6.2 FILE WRITE

Save incoming JSON body into `data.json`.

## REQUIREMENTS

Your program must:

* Handle `POST /data`
* Parse JSON request body
* Save body to `data.json`
* Return status `200`
* If request body is invalid JSON, return status `400`

## VERIFY

```bash
eu-node-basics verify 17 file_write.js
```

## Debug
1. Run your solution manually:
```bash
node file_write.js 3000
```
2. Create local test files:
```bash
bash exercises/17-file-write/debug.sh
```
3. Send POST request with JSON body:
```bash
curl -i -X POST http://127.0.0.1:3000/data \
  -H "Content-Type: application/json" \
  --data-binary @request.body.json
```
4. Check written file:
```bash
cat data.json
```
5. Verify:
```bash
eu-node-basics verify 17 file_write.js
```
