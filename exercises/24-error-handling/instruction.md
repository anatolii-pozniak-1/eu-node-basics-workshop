# 24 - 7.3 HANDLE PARTIAL FAILURES

Handle partial failures with `Promise.allSettled`.

## REQUIREMENTS

Your program must:

* Handle `POST /error-handling`
* Read file names from request body JSON array, for example:
  * `["a.txt", "missing.txt", "c.txt"]`
* Use `Promise.allSettled`
* Return JSON with:
  * `successes` (array)
  * `failures` (array)
  * `total` (number)
* If request JSON is malformed or not an array, return status `400`

## EXPECTED RESPONSE

Status `200` even when one file read fails.

Example request:

```http
POST /error-handling
Content-Type: application/json

["a.txt", "missing.txt", "c.txt"]
```

## VERIFY

```bash
eu-node-basics verify 24 handle_partial_failures.js
```

## Debug
1. Run your solution manually:
```bash
node handle_partial_failures.js 3000
```
2. Create local files:
```bash
echo "A" > a.txt
echo "C" > c.txt
```
3. Success case (`200` with partial failure):
```bash
curl -i -X POST http://127.0.0.1:3000/error-handling \
  -H "Content-Type: application/json" \
  --data-binary '["a.txt","missing.txt","c.txt"]'
```
4. Malformed JSON case (`400`):
```bash
curl -i -X POST http://127.0.0.1:3000/error-handling \
  -H "Content-Type: application/json" \
  --data-binary '{"files":'
```
5. Verify:
```bash
eu-node-basics verify 24 handle_partial_failures.js
```
