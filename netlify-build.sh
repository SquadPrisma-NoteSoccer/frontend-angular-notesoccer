#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-development}"
OUT="dist/notesoccer"

# Instala dependências
if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Build Angular
if [ "$MODE" = "production" ]; then
  npx ng build --configuration=production --output-path="$OUT"
else
  npx ng build --configuration=development --output-path="$OUT" --no-prerender
fi

# Descobre onde está o index.html e copia para dist/publish
PUB=""
for CAND in "$OUT/browser" "dist/browser" "$OUT"; do
  if [ -f "$CAND/index.html" ]; then PUB="$CAND"; break; fi
done

if [ -z "$PUB" ]; then
  echo "ERRO: index.html não encontrado em $OUT/browser, dist/browser ou $OUT"
  ls -la dist || true
  exit 1
fi

rm -rf dist/publish
mkdir -p dist/publish
cp -r "$PUB"/. dist/publish/

echo ">>> Publicando de: $PUB"
echo ">>> Conteúdo de dist/publish:"
ls -la dist/publish
