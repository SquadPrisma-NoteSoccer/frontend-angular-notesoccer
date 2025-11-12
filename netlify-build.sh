#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-development}"
OUT="dist/notesoccer"
ENV_FILE="src/assets/env.js"

echo ">>> PWD: $(pwd)"
echo ">>> Build mode: ${MODE}"
echo ">>> Publish dir target: dist/publish"

# 1) Sanity checks
if [ ! -f "$ENV_FILE" ]; then
  echo "ERRO: $ENV_FILE não encontrado."
  echo "Dica: confirme que foi commitado e o caminho é exatamente 'src/assets/env.js'."
  echo "Listando src/ e src/assets/ (se existirem):"
  ls -la src || true
  ls -la src/assets || true
  exit 2
fi

if [ -z "${NG_APP_API_BASE_URL:-}" ]; then
  echo "ERRO: variável NG_APP_API_BASE_URL não definida no ambiente do Netlify."
  echo "Defina em Site settings -> Build & deploy -> Environment."
  exit 2
fi

# 2) Injeção da variável no env.js
echo ">>> Injetando NG_APP_API_BASE_URL em ${ENV_FILE}"
sed -i "s|##NG_APP_API_BASE_URL##|${NG_APP_API_BASE_URL}|g" "$ENV_FILE"
echo ">>> Primeiras linhas do env.js após replace:"
head -n 5 "$ENV_FILE" || true

# 3) Instala dependências
echo ">>> Install deps"
if [ -f package-lock.json ]; then npm ci; else npm install; fi

# 4) Build Angular
echo ">>> Build Angular (${MODE})"
if [ "$MODE" = "production" ]; then
  npx ng build --configuration=production --output-path="$OUT"
else
  npx ng build --configuration=development --output-path="$OUT" --no-prerender
fi

# 5) Descobrir index gerado para montar dist/publish
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

# Se só existir index.csr.html, renomeia para index.html
if [ -f dist/publish/index.csr.html ] && [ ! -f dist/publish/index.html ]; then
  echo ">>> Renaming index.csr.html -> index.html"
  mv dist/publish/index.csr.html dist/publish/index.html
fi

echo ">>> Final publish content (after rename):"
ls -la dist/publish

# 6) Dica de validação
echo ">>> Dica: após o deploy, abra /assets/env.js e confirme a URL injetada."
