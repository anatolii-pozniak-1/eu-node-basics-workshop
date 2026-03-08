# 22 - 7.2 PARALLEL READS

Read files in parallel using `Promise.all`.

## REQUIREMENTS

Your program must:

* Handle `GET /parallel`
* Read `a.txt`, `b.txt`, `c.txt` in parallel
* Use `Promise.all(...)` to run reads in parallel
* Return JSON with:
  * `combined` (string: `a.txt + b.txt + c.txt`)
  * `elapsedMs` (number)
* Set header `Content-Type: application/json`
* Unknown routes (or wrong method for this route) should not return `200`

## EXAMPLE INPUT FILES

```txt
a.txt -> A
b.txt -> B
c.txt -> C
```

## EXAMPLE REQUEST

```http
GET /parallel
```

## EXPECTED RESPONSE

Status `200` and JSON like:

```json
{
  "combined": "ABC",
  "elapsedMs": 123
}
```

## VERIFY

```bash
eu-node-basics verify 22 parallel_reads.js
```

## Debug
1. Run your solution manually:
```bash
node parallel_reads.js 3000
```
2. Create local files:
```bash
echo "A" > a.txt
echo "B" > b.txt
echo "C" > c.txt
```
3. Check success response:
```bash
curl -i http://127.0.0.1:3000/parallel
```
4. Check negative cases:
```bash
curl -i -X POST http://127.0.0.1:3000/parallel
curl -i http://127.0.0.1:3000/nope
```
5. Verify:
```bash
eu-node-basics verify 22 parallel_reads.js
```
