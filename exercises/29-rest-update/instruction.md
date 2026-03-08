# 29 - 9.4 REST UPDATE

Implement a route to update a resource by id.

## REQUIREMENTS

Your program must:

* Handle `PUT /items/:id`
* Parse JSON body with updates
* Update matching item in `data.json`
* Return status `200`
* Return updated item as JSON
* Return `404` if item not found
* Unknown routes (or wrong method for this route) should not return `200`

## EXAMPLE `data.json` (before)

```json
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" }
]
```

## EXAMPLE REQUEST

```http
PUT /items/2
Content-Type: application/json

{ "name": "Updated Beta" }
```

## EXPECTED RESPONSE

Status `200` and JSON:

```json
{ "id": 2, "name": "Updated Beta" }
```

## VERIFY

```bash
eu-node-basics verify 29 rest_update.js
```

## Debug
1. Run your solution manually:
```bash
node rest_update.js 3000
```
2. Create local file:
```bash
cat > data.json <<'JSON'
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" }
]
JSON
```
3. Success case (`200`):
```bash
curl -i -X PUT http://127.0.0.1:3000/items/2 \
  -H "Content-Type: application/json" \
  --data-binary '{"name":"Updated Beta"}'
cat data.json
```
4. Not found case (`404`):
```bash
curl -i -X PUT http://127.0.0.1:3000/items/999 \
  -H "Content-Type: application/json" \
  --data-binary '{"name":"Nope"}'
```
5. Verify:
```bash
eu-node-basics verify 29 rest_update.js
```
