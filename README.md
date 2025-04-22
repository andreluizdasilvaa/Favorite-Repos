# Favorite Repos

Aplicação React para gerenciar e acompanhar seus repositórios favoritos do GitHub.

---

## Sumário

- [Descrição Geral](#descrição-geral)
- [Funcionalidades](#funcionalidades)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Principais Dependências](#principais-dependências)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Fluxo Principal da Aplicação](#fluxo-principal-da-aplicação)
- [Detalhes das Páginas](#detalhes-das-páginas)
- [Estilização](#estilização)
- [Integração com a API do GitHub](#integração-com-a-api-do-github)
- [Observações de Segurança](#observações-de-segurança)
- [Referências](#referências)

---

## Descrição Geral

Este projeto é uma aplicação React criada para permitir ao usuário salvar, pesquisar e acompanhar seus repositórios favoritos do GitHub de forma simples e rápida. O usuário pode adicionar repositórios, visualizar detalhes e issues, filtrar por status e navegar por páginas de issues.

---

## Funcionalidades

- **Adicionar repositórios favoritos** via busca pelo nome completo (`owner/repo`).
- **Listar repositórios salvos** com opção de remoção.
- **Visualizar detalhes do repositório** e suas issues.
- **Exibir quantidade de estrelas do repositório**.
- **Paginação das issues** (5 por página).
- **Filtragem das issues** por status: todas, abertas ou fechadas.
- **Persistência local** dos repositórios favoritos via `localStorage`.
- **Integração com a API do GitHub** (com suporte a token pessoal).

---

## Estrutura de Pastas

```
favoriterepos/
├── public/
│   ├── index.html
│   └── robots.txt
├── src/
│   ├── pages/
│   │   ├── Main/
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   └── Repositorio/
│   │       ├── index.js
│   │       └── styles.js
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── colors.js
│   │   └── global.js
│   ├── App.js
│   ├── index.js
│   └── routes.js
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── package.json
└── README.md
```

---

## Principais Dependências

- **React**: Biblioteca principal para construção da interface.
- **react-router-dom**: Roteamento entre páginas.
- **styled-components**: Estilização dos componentes.
- **axios**: Requisições HTTP para a API do GitHub.
- **react-icons**: Ícones SVG.
- **prettier**: Padronização de código.

---

## Configuração do Ambiente

1. **Clonar o repositório** e instalar as dependências:

    ```sh
    git clone https://github.com/andreluizdasilvaa/Favorite-Repos favoriterepos
    cd favoriterepos
    npm install
    ```

2. **Configurar o token do GitHub**:

    - Crie um arquivo `.env` na raiz do projeto.
    - Adicione sua chave pessoal:
        ```
        REACT_APP_GITHUB_TOKEN=seu_token_aqui
        ```
    - Um exemplo está disponível em `.env.example`.

3. **Iniciar o projeto**:
    ```sh
    npm start
    ```

---

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção.
- `npm run eject`: Eject do Create React App.

---

## Fluxo Principal da Aplicação

### 1. Página Inicial (`/`)

- **Adicionar repositório**: O usuário digita o nome completo do repositório e clica em adicionar.
- **Listagem**: Exibe todos os repositórios salvos localmente.
- **Remover**: O usuário pode remover um repositório da lista.
- **Navegar para detalhes**: Ao clicar no ícone de barras, o usuário é redirecionado para a página de detalhes do repositório.

### 2. Página de Detalhes do Repositório (`/repositorio/:repositorio`)

- **Exibe informações do repositório**: Nome, descrição e avatar da organização (se houver).
- **Exibe a quantidade de estrelas do repositório**.
- **Lista de issues**: Mostra as issues do repositório, 5 por página.
- **Paginação**: Botões para avançar e voltar páginas.
- **Filtro de status**: Botões para filtrar issues por "All", "Open" ou "Closed".

---

## Detalhes das Páginas

### Main (`src/pages/Main/index.js`)

- Gerencia o estado dos repositórios favoritos.
- Usa `localStorage` para persistência.
- Faz requisições à API do GitHub para validar e obter dados do repositório.
- Permite remoção de repositórios.

### Repositorio (`src/pages/Repositorio/index.js`)

- Busca detalhes do repositório e suas issues.
- Exibe a quantidade de estrelas do repositório.
- Permite filtrar issues por status.
- Implementa paginação das issues.
- Exibe informações do usuário que abriu a issue, labels e estado.

---

## Estilização

- Utiliza `styled-components` para criar componentes estilizados reutilizáveis.
- Cores principais definidas em `src/styles/colors.js`.
- Estilos globais em `src/styles/global.js`.

---

## Integração com a API do GitHub

- As requisições são feitas via `src/services/api.js` usando `axios`.
- O token do GitHub é lido do arquivo `.env` para evitar limites baixos de requisições.
- Endpoints utilizados:
    - `GET /repos/:owner/:repo`
    - `GET /repos/:owner/:repo/issues`

---

## Observações de Segurança

- **Nunca compartilhe seu token do GitHub publicamente**. O arquivo `.env` está no `.gitignore`, mas evite subir o token para repositórios públicos.
- O token presente no arquivo `.env` deste projeto deve ser removido antes de qualquer publicação.

---

## Referências

- [Documentação oficial do React](https://reactjs.org/)
- [API do GitHub](https://docs.github.com/pt/rest)
- [Create React App](https://create-react-app.dev/)

---