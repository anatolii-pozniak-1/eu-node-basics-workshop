#!/usr/bin/env bash
set -euo pipefail

cat > data.before.json <<'JSON'
[
  { "id": 1, "name": "Old" }
]
JSON

cat > request.body.json <<'JSON'
[
  { "id": 1, "name": "New" },
  { "id": 2, "name": "Next" }
]
JSON

cp data.before.json data.json

echo "Created files:"
echo "  data.before.json"
echo "  request.body.json"
echo "  data.json (copied from data.before.json)"
echo
echo "Run server: node file_write.js 3000"
echo "Send POST: curl -i -X POST http://127.0.0.1:3000/data -H 'Content-Type: application/json' --data-binary @request.body.json"
echo "Check file: cat data.json"
