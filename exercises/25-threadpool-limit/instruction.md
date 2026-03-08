# 25 - 7.4 THREADPOOL LIMIT

Simulate heavy async work and observe performance characteristics.

## REQUIREMENTS

Your program must:

* Handle `GET /threadpool-limit`
* Start exactly 8 heavy async tasks in parallel using `crypto.pbkdf2`
* Return JSON with:
  * `tasks` (number)
  * `durationMs` (number)
* Set header `Content-Type: application/json`
* Unknown routes (or wrong method for this route) should not return `200`

## EXAMPLE REQUEST

```http
GET /threadpool-limit
```

## EXPECTED RESPONSE

Status `200` and JSON like:

```json
{
  "tasks": 8,
  "durationMs": 1234
}
```

## VERIFY

```bash
eu-node-basics verify 25 threadpool_limit.js
```

## Debug
1. Run your solution manually:
```bash
node threadpool_limit.js 3000
```
2. Call the route:
```bash
curl -i http://127.0.0.1:3000/threadpool-limit
```
3. Check negative cases:
```bash
curl -i -X POST http://127.0.0.1:3000/threadpool-limit
curl -i http://127.0.0.1:3000/nope
```
4. Verify:
```bash
eu-node-basics verify 25 threadpool_limit.js
```
