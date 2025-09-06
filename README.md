## DESAFIO Backend VALCAN

REST API de Usuários (HTTP + CORS + respostas)

API simples para gerenciamento de usuários usando dados mock (`mock-users.json`), com validação, paginação e tratamento centralizado de erros.

## 🛠 Tecnologias Utilizadas
- **Node.js** (JavaScript runtime)
- **TypeScript** (tipagem estática)
- **Express** (framework HTTP)
- **Zod** (validação de dados)

## 🚀 Estrutura do Projeto

- /controller/ # Camada HTTP: recebe requisições e envia respostas
- /middlewares # Middlewares: logs, tratamento de erros
- /mock # Mock de dados
- /models/ #Modelos, erros customizados e validadores
- /repositories # Acesso aos dados (mock ou DB)
- /routes # Definição das rotas da API
- /services # Regras de negócio
- server.ts

## 🛠 Instalação

```
bash
git clone https://github.com/lucasgby/desafio-backend-valcann.git
cd project
npm install
npm run dev
```

- O servidor rodará por padrão em http://localhost:3333.

## 📦 Rotas Disponíveis

exemplo de request:

OBS: Existe um arquivo client.http onde podesse testar diretamente no Vscode as requisições http sem
necessidade do Postman ou Insomnia.

```
http://localhost:3333/users
http://localhost:3333/users/page=1&page_size=10&q=bruno
http://localhost:3333/users/15
```

1. GET /users
Retorna uma lista paginada de usuários.

Query Params:
| Param       | Tipo    | Obrigatório | Descrição                                             |
| ----------- | ------- | ----------- | ----------------------------------------------------- |
| `page`      | number  | não         | Página atual (default 1)                              |
| `page_size` | number  | não         | Itens por página (default 10, máximo 50)              |
| `q`         | string  | não         | Busca parcial por `name` ou `email`                   |
| `role`      | string  | não         | Filtra pelo campo `role`                              |
| `is_active` | boolean | não         | Filtra usuários ativos (`true`) ou inativos (`false`) |


2. GET /users/:id

Retorna um usuário específico pelo id.

| Param | Tipo   | Obrigatório | Descrição     |
| ----- | ------ | ----------- | ------------- |
| `id`  | number | sim         | ID do usuário |

## ⚡ Tratamento de Erros
Todos os erros passam pelo middleware de erro (errorMiddleware.ts) e seguem o padrão:

```
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": ["Page must be a valid number"]
  }
}
```

## 📝 Observações

- A API utiliza Zod para validação de parâmetros.
- Paginação limitada a 50 itens por página.
- is_active sempre retorna boolean.
- Simulação de banco de dados com mock-users.json.