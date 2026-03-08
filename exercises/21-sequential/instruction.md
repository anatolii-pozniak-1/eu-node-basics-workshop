# 21 - 7.1 SEQUENTIAL FILE READS

Read 3 files sequentially.

## REQUIREMENTS

Your program must:

* Handle `GET /sequential`
* Read `a.txt`, then `b.txt`, then `c.txt` in sequence
* Return JSON with:
  * `combined` (string)
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
GET /sequential
```

## EXPECTED RESPONSE

Status `200` and JSON:

```json
{
  "combined": "ABC",
  "elapsedMs": 123
}
```

## VERIFY

```bash
eu-node-basics verify 21 sequential_file_reads.js
```

## Debug
1. Run your solution manually:
```bash
node sequential_file_reads.js 3000
```
2. Create local files:
```bash
echo "A" > a.txt
echo "B" > b.txt
echo "C" > c.txt
```
3. Check success response:
```bash
curl -i http://127.0.0.1:3000/sequential
```
4. Check negative cases:
```bash
curl -i -X POST http://127.0.0.1:3000/sequential
curl -i http://127.0.0.1:3000/nope
```
5. Verify:
```bash
eu-node-basics verify 21 sequential_file_reads.js
```
