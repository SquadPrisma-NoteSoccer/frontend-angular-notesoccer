git fetch upstream

for branch in develop feature/tela-cadastro-organizador feature/tela-de-boas-vindas main
do
  echo "==> Atualizando $branch"
  git checkout $branch
  git pull upstream $branch
done
