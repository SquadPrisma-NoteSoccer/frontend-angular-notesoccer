#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-development}"
OUT="dist/notesoccer"

echo ">>> Install deps"
if [ -f package-lock.json ]; then npm ci; else npm install; fi

echo ">>> Build Angular ($MODE)"
if [ "$MODE" = "production" ]; then
  npx ng build --configuration=production --output-path="$OUT"
else
  npx ng build --configuration=development --output-path="$OUT" --no-prerender
fi

echo ">>> After build, show html candidates (first 3 levels)"
find dist -maxdepth 3 -type f -name "*.html" -print || true

echo ">>> Locate index.html (or CSR/browser variants)"
FOUND=""
for NAME in "index.html" "index.csr.html" "index.browser.html"; do
  CAND=$(find dist -type f -name "$NAME" | head -n1 || true)
  if [ -n "${CAND}" ]; then FOUND="$CAND"; break; fi
done

if [ -z "${FOUND}" ]; then
  echo "ERRO: Nenhum index.html encontrado dentro de dist/."
  find dist -maxdepth 4 -type f -print | sed 's/^/  - /'
  exit 1
fi

PUB_DIR="$(dirname "$FOUND")"
echo ">>> Found index at: $FOUND"
echo ">>> Using publish directory: $PUB_DIR"

rm -rf dist/publish
mkdir -p dist/publish
cp -r "${PUB_DIR}"/. dist/publish/

echo ">>> Final publish content (before rename):"
ls -la dist/publish

# 💡 Se só existir index.csr.html, renomeia para index.html
if [ -f dist/publish/index.csr.html ] && [ ! -f dist/publish/index.html ]; then
  echo ">>> Renaming index.csr.html -> index.html"
  mv dist/publish/index.csr.html dist/publish/index.html
fi

echo ">>> Final publish content (after rename):"
ls -la dist/publish
