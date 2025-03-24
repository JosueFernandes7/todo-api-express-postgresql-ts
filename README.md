# TODO API - Josué

Este é o backend de uma API para gerenciamento de TODOs, construída com **Express**, **TypeScript**, **Zod**,  **Nodemailer**, **PostgreSQL** e **Prisma**.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados no seu ambiente de desenvolvimento:

- **Node.js** (versão 18+ recomendada)
- **Docker** e **Docker Compose** (para rodar o banco de dados PostgreSQL)
- **NPM** ou **Yarn** (NPM já vem com Node.js)

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/JosueFernandes7/todo-api-express-postgresql-ts.git
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com os seguintes valores:

```bash
   POSTGRES_USER=
   POSTGRES_PASSWORD=
   POSTGRES_DB=
   DATABASE_URL=
   JWT_SECRET=
   PORT=
   BASE_URL=
   EMAIL_PASS=
   EMAIL_USER=
```

## Rodando o projeto

Suba os contêineres Docker (PostgreSQL):
```bash
npm run docker:up
```

Execute as migrações do banco de dados:
```bash
npm run migrate
```

Gere o cliente Prisma:
```bash
npm run generate
```
Inicialize o prisma Studio para visualização do banco
```bash
npm run studio
```
Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

## Comandos úteis

| Comando             | Descrição                                                       |
|---------------------|-----------------------------------------------------------------|
| `npm run dev`       | Inicia o servidor em modo de desenvolvimento (com hot reload). |
| `npm run build`     | Compila o TypeScript para JavaScript na pasta `dist`.          |
| `npm start`         | Inicia o servidor a partir do código compilado.                |
| `npm run generate`  | Gera o cliente Prisma baseado no esquema definido.             |
| `npm run migrate`   | Aplica migrações no banco de dados.                            |
| `npm run studio`    | Abre o Prisma Studio para gerenciar o banco de dados.          |
| `npm run docker:up` | Sobe os contêineres Docker PostgreSQL.                                     |
| `npm run docker:down` | Derruba os contêineres Docker PostgreSQL.                                |

## Estrutura do Projeto



```bash
.
├── src/
│   ├── config/          # Configurações do servidor e banco de dados
│   └── config/server.ts # Inicialização do servidor
│   ├── controllers/     # Controladores responsáveis pelas regras de entrada/saída
│   ├── middlewares/     # Middlewares para autenticação e tratamento de erros
│   ├── routes/          # Rotas organizadas por entidade
│   ├── services/        # Lógica de negócio
│   ├── repositories/    # Comunicação com o banco de dados
│   ├── types/           # Definições de tipos TypeScript
├── prisma/
│   ├── schema.prisma    # Esquema do banco de dados
│   └── migrations/      # Migrações geradas pelo Prisma
├── .env                 # Configurações de ambiente
├── package.json         # Dependências e scripts
└── README.md            # Documentação do projeto
```

## Tecnologias utilizadas

- ``Node.js``: Ambiente de execução do JavaScript
- ``Express``: Framework para construção de APIs
- ``TypeScript``: Superset do JavaScript com tipagem estática
- ``Prisma``: ORM para gerenciamento de banco de dados
- ``PostgreSQL``: Banco de dados relacional
- ``Swagger``: Documentação da API
- ``Docker``: Container do Banco de Dados

## Documentação da API

```bash
http://localhost:3000/api-docs
```
