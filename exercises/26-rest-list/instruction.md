# 26 - 9.1 REST LIST

Implement a route to list resources.

## REQUIREMENTS

Your program must:

* Handle `GET /items`
* Read items from `data.json` (array)
* Return status `200`
* Return JSON array
* Set `Content-Type: application/json`
* Unknown routes (or wrong method for this route) should not return `200`

## EXAMPLE `data.json`

```json
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" }
]
```

## EXAMPLE REQUEST

```http
GET /items
```

## EXPECTED RESPONSE

Status `200` and JSON:

```json
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" }
]
```

## VERIFY

```bash
eu-node-basics verify 26 rest_list.js
```

## Debug
1. Run your solution manually:
```bash
node rest_list.js 3000
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
3. Success case:
```bash
curl -i http://127.0.0.1:3000/items
```
4. Negative cases:
```bash
curl -i -X POST http://127.0.0.1:3000/items
curl -i http://127.0.0.1:3000/nope
```
5. Verify:
```bash
eu-node-basics verify 26 rest_list.js
```
