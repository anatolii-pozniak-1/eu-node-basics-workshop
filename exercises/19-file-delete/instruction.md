# 19 - 6.4 FILE DELETE

Delete an item from `data.json` by id.

## REQUIREMENTS

Your program must:

* Handle `DELETE /data/:id`
* Remove matching object from `data.json`
* Return status `200`
* If no object with requested id exists, return status `404`
* If `data.json` content is malformed JSON, return status `400`
* If `data.json` does not exist, return status `500`

Example `data.json`:

```json
[
  { "id": 1, "name": "One" },
  { "id": 2, "name": "Two" },
  { "id": 3, "name": "Three" }
]
```

Example request:

```http
DELETE /data/2
```

## VERIFY

```bash
eu-node-basics verify 19 file_delete.js
```

## Debug
1. Run your solution manually:
```bash
node file_delete.js 3000
```
2. Create local test files:
```bash
bash exercises/19-file-delete/debug.sh
```
3. Success case (`200`):
```bash
curl -i -X DELETE http://127.0.0.1:3000/data/2
cat data.json
```
4. Not found case (`404`):
```bash
curl -i -X DELETE http://127.0.0.1:3000/data/999
```
5. Malformed `data.json` case (`400`):
```bash
cp data.malformed.json data.json
curl -i -X DELETE http://127.0.0.1:3000/data/2
```
6. Missing file case (`500`):
```bash
rm data.json
curl -i -X DELETE http://127.0.0.1:3000/data/2
```
7. Verify:
```bash
eu-node-basics verify 19 file_delete.js
```
