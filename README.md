# NoteSoccer - Aplicação Frontend Angular

Esta é uma aplicação frontend baseada em Angular para um sistema de anotações e gerenciamento relacionado a ligas amadoras de futebol.

## Índice

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Servidor de Desenvolvimento](#servidor-de-desenvolvimento)
- [Build](#build)
- [Executando Testes](#executando-testes)
  - [Testes Unitários](#testes-unitários)
  - [Testes End-to-End (Cypress)](#testes-end-to-end-cypress)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuindo](#contribuindo)

## Visão Geral do Projeto

NoteSoccer é uma aplicação web projetada para entusiastas de futebol registrarem anotações, gerenciarem times e acompanharem diversas informações relacionadas ao futebol. Esta aplicação frontend fornece a interface de usuário para interagir com o sistema.

## Tecnologias Utilizadas

- **Framework Frontend**: Angular (Arquitetura de Componentes Standalone)
- **Linguagem**: TypeScript
- **Estilização**: SCSS
- **Testes**: 
  - Testes Unitários: Jasmine & Karma
  - Testes End-to-End: Cypress
- **Ferramenta de Build**: Angular CLI

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- Node.js (versão 16 ou superior)
- npm (geralmente vem com o Node.js)

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositório>
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd frontend-angular-notesoccer
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## Servidor de Desenvolvimento

Para iniciar um servidor de desenvolvimento:

```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200/`. Se a porta 4200 já estiver em uso, você pode especificar uma porta diferente:

```bash
ng serve --port 4201
```

O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

## Build

Para construir o projeto para produção:

```bash
ng build
```

Os artefatos da construção serão armazenados no diretório `dist/`.

## Executando Testes

### Testes Unitários

Para executar testes unitários via [Karma](https://karma-runner.github.io):

```bash
ng test
```

### Testes End-to-End (Cypress)

Para executar testes end-to-end com Cypress:

1. Certifique-se de que o servidor de desenvolvimento está em execução:

   ```bash
   ng serve --port 4201
   ```

2. Em um terminal separado, execute o Cypress:

   ```bash
   # Modo interativo
   npm run cypress:open
   
   # Modo headless
   npm run cypress:run
   ```

Os testes E2E do Cypress estão localizados no diretório `cypress/e2e` e são escritos em TypeScript. Eles simulam a interação do usuário com a aplicação em um navegador real.

Para informações detalhadas sobre testes com Cypress, consulte [README do Cypress](./cypress/README.md).

## Estrutura do Projeto

```bash
src/
├── app/
│   ├── app.config.ts      # Configuração da aplicação
│   ├── app.html           # Template principal da aplicação
│   ├── app.routes.ts      # Rotas da aplicação
│   ├── app.spec.ts        # Testes unitários do componente app
│   └── app.ts             # Componente principal da aplicação
├── index.html             # Arquivo HTML principal
├── main.ts                # Ponto de entrada da aplicação
└── styles.scss            # Estilos globais
```

## Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para a feature
3. Commit suas alterações
4. Faça push para a branch
5. Crie um novo Pull Request
