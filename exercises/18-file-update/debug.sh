#!/usr/bin/env bash
set -euo pipefail

cat > data.json <<'JSON'
[
  { "id": 1, "name": "One" },
  { "id": 2, "name": "Two" },
  { "id": 3, "name": "Three" }
]
JSON

echo "Created data.json for FILE UPDATE task."
echo
echo "Run server: node file_update.js 3000"
echo "Success:  curl -i -X PUT http://127.0.0.1:3000/data/2 -H 'Content-Type: application/json' --data-binary '{\"name\":\"Updated Two\"}'"
echo "Bad JSON: curl -i -X PUT http://127.0.0.1:3000/data/2 -H 'Content-Type: application/json' --data-binary '{\"name\": '"
echo "Missing file test: rm data.json && curl -i -X PUT http://127.0.0.1:3000/data/2 -H 'Content-Type: application/json' --data-binary '{\"name\":\"Another Name\"}'"
