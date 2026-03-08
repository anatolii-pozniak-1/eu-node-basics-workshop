#!/usr/bin/env bash
set -euo pipefail

cat > data.valid.json <<'JSON'
{
  "items": [
    { "id": 1, "name": "Alpha" },
    { "id": 2, "name": "Beta" }
  ]
}
JSON

cat > data.invalid.json <<'JSON'
{ invalid json
JSON

cp data.valid.json data.json

echo "Created files:"
echo "  data.valid.json"
echo "  data.invalid.json"
echo "  data.json (copied from valid sample)"
echo
echo "Run server: node file_read.js 3000"
echo "Success check: curl -i http://127.0.0.1:3000/data"
echo "Error check:   cp data.invalid.json data.json && curl -i http://127.0.0.1:3000/data"
