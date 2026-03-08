# 28 - 9.3 REST CREATE

Implement a route to create a resource.

## REQUIREMENTS

Your program must:

* Handle `POST /items`
* Parse JSON request body
* Append new item to `data.json`
* Return status `201`
* Return created item as JSON
* Unknown routes (or wrong method for this route) should not return `200`

## EXAMPLE `data.json` (before)

```json
[
  { "id": 1, "name": "Alpha" }
]
```

## EXAMPLE REQUEST

```http
POST /items
Content-Type: application/json

{ "id": 2, "name": "Beta" }
```

## EXPECTED RESPONSE

Status `201` and JSON:

```json
{ "id": 2, "name": "Beta" }
```

## VERIFY

```bash
eu-node-basics verify 28 rest_create.js
```

## Debug
1. Run your solution manually:
```bash
node rest_create.js 3000
```
2. Create local file:
```bash
cat > data.json <<'JSON'
[
  { "id": 1, "name": "Alpha" }
]
JSON
```
3. Success case:
```bash
curl -i -X POST http://127.0.0.1:3000/items \
  -H "Content-Type: application/json" \
  --data-binary '{"id":2,"name":"Beta"}'
cat data.json
```
4. Negative cases:
```bash
curl -i http://127.0.0.1:3000/items
curl -i http://127.0.0.1:3000/nope
```
5. Verify:
```bash
eu-node-basics verify 28 rest_create.js
```
