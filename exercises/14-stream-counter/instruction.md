# 14 - 8.4 STREAM COUNTER

Count bytes and chunks from a streamed request body.

## REQUIREMENTS

Your program must:

* Handle `POST /count`
* Read the request body as a stream
* Return JSON with:
  * `bytes`
  * `chunks`

## VERIFY

```bash
eu-node-basics verify 14 stream_counter.js
```
