# 18 - 6.3 FILE UPDATE

Update an item in `data.json` by id.

## REQUIREMENTS

Your program must:

* Handle `PUT /data/:id`
* Read `data.json` (array of objects)
* Update the matching object by id
* Keep other objects unchanged
* Return status `200`
* If no object with requested id exists, return status `404`
* If request body JSON is malformed, return status `400`
* If `data.json` does not exist, return status `500`

Example `data.json`:

```json
[
  { "id": 1, "name": "One" },
  { "id": 2, "name": "Two" }
]
```

Example request:

```http
PUT /data/2
Content-Type: application/json

{ "name": "Updated Two" }
```

## VERIFY

```bash
eu-node-basics verify 18 file_update.js
```

## Debug
1. Run your solution manually:
```bash
node file_update.js 3000
```
2. Create local test files:
```bash
bash exercises/18-file-update/debug.sh
```
3. Success case (`200`):
```bash
curl -i -X PUT http://127.0.0.1:3000/data/2 \
  -H "Content-Type: application/json" \
  --data-binary '{"name":"Updated Two"}'
cat data.json
```
4. Malformed JSON case (`400`):
```bash
curl -i -X PUT http://127.0.0.1:3000/data/2 \
  -H "Content-Type: application/json" \
  --data-binary '{"name": '
```
5. Missing file case (`500`):
```bash
rm data.json
curl -i -X PUT http://127.0.0.1:3000/data/2 \
  -H "Content-Type: application/json" \
  --data-binary '{"name":"Another Name"}'
```
6. Missing id case (`404`):
```bash
bash exercises/18-file-update/debug.sh
curl -i -X PUT http://127.0.0.1:3000/data/999 \
  -H "Content-Type: application/json" \
  --data-binary '{"name":"Missing"}'
```
7. Verify:
```bash
eu-node-basics verify 18 file_update.js
```
