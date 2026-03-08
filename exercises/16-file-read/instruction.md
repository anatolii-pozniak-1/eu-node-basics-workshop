# 16 - 6.1 FILE READ

Load JSON data from file and return it from an endpoint.

## REQUIREMENTS

Your program must:

* Read `data.json`
* Handle `GET /data`
* Return file content as a JSON object
* Return status `200`
* Set header `Content-Type: application/json`
* If `data.json` cannot be parsed, return status `400` or `500`

## VERIFY

```bash
eu-node-basics verify 16 file_read.js
```

## Debug
1. Run your solution manually:
```bash
node file_read.js 3000
```
2. Create local test files:
```bash
bash exercises/16-file-read/debug.sh
```
3. Test success case (`data.json` is valid):
```bash
curl -i http://127.0.0.1:3000/data
```
4. Test error case (`data.json` is invalid):
```bash
cp data.invalid.json data.json
curl -i http://127.0.0.1:3000/data
```
5. Restore valid file and verify again:
```bash
cp data.valid.json data.json
eu-node-basics verify 16 file_read.js
```
