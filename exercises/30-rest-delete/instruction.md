# 30 - 9.5 REST DELETE

Implement a route to delete a resource by id.

## REQUIREMENTS

Your program must:

* Handle `DELETE /items/:id`
* Remove matching item from `data.json`
* Return status `200`
* Return `404` if item not found
* Unknown routes (or wrong method for this route) should not return `200`

## EXAMPLE `data.json` (before)

```json
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" },
  { "id": 3, "name": "Gamma" }
]
```

## EXAMPLE REQUEST

```http
DELETE /items/2
```

## EXPECTED RESPONSE

Status `200`.

## VERIFY

```bash
eu-node-basics verify 30 rest_delete.js
```

## Debug
1. Run your solution manually:
```bash
node rest_delete.js 3000
```
2. Create local file:
```bash
cat > data.json <<'JSON'
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" },
  { "id": 3, "name": "Gamma" }
]
JSON
```
3. Success case (`200`):
```bash
curl -i -X DELETE http://127.0.0.1:3000/items/2
cat data.json
```
4. Not found case (`404`):
```bash
curl -i -X DELETE http://127.0.0.1:3000/items/999
```
5. Verify:
```bash
eu-node-basics verify 30 rest_delete.js
```
