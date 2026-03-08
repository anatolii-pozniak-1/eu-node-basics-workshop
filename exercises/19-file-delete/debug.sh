#!/usr/bin/env bash
set -euo pipefail

cat > data.valid.json <<'JSON'
[
  { "id": 1, "name": "One" },
  { "id": 2, "name": "Two" },
  { "id": 3, "name": "Three" }
]
JSON

cat > data.malformed.json <<'JSON'
[
  { "id": 1, "name": "One" },
  { "id": 2, "name": "Two"
JSON

cp data.valid.json data.json

echo "Created files:"
echo "  data.valid.json"
echo "  data.malformed.json"
echo "  data.json (copied from valid sample)"
echo
echo "Run server: node file_delete.js 3000"
echo "200 test:  curl -i -X DELETE http://127.0.0.1:3000/data/2"
echo "404 test:  curl -i -X DELETE http://127.0.0.1:3000/data/999"
echo "400 test:  cp data.malformed.json data.json && curl -i -X DELETE http://127.0.0.1:3000/data/2"
echo "500 test:  rm data.json && curl -i -X DELETE http://127.0.0.1:3000/data/2"
