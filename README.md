# FormCam API

Backend da aplicação FormCam desenvolvido com Fastify, TypeScript e Prisma.

## 🚀 Tecnologias

- **Node.js** >= 18.0.0
- **Fastify** - Framework web
- **TypeScript** - Linguagem de programação
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Swagger/OpenAPI** - Documentação automática
- **bcrypt** - Hash de senhas

## 📋 Pré-requisitos

## 🔄 Padrões de Codificação

### Transformação de snake_case para camelCase

Os schemas Zod para produtos e ocorrências agora suportam automaticamente dados no formato `snake_case` (como enviados pelo frontend) e os convertem para `camelCase` para uso interno na aplicação. Isso garante compatibilidade com o frontend sem necessidade de alterações nele.

Exemplo de payload aceito:
```json
{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "occurrence_date": "2023-01-01",
  "product": "Produto Exemplo",
  "quantity": 10,
  "name_of_responsible": "João Silva",
  "unit": "UN"
}
```

Internamente, os dados são convertidos para:
```typescript
{
  uuid: "123e4567-e89b-12d3-a456-426614174000",
  occurrenceDate: "2023-01-01",
  product: "Produto Exemplo",
  quantity: 10,
  nameOfResponsible: "João Silva",
  unit: "UN"
}
```

Esta transformação é feita automaticamente pelos schemas Zod:
- `src/shared/schemas/product.zod.ts`
- `src/shared/schemas/occurrence.zod.ts`


- Node.js >= 18.0.0
- Yarn ou npm
- PostgreSQL

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd formcam_api
```

2. Instale as dependências:
```bash
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your-secret-key-here"
PORT=3336
```

4. Execute as migrações do banco:
```bash
yarn prisma migrate dev
```

## 🏃‍♂️ Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento:
```bash
yarn dev
```

O servidor estará disponível em `http://localhost:3336`

## 🏗️ Build

Para gerar o build de produção:
```bash
yarn build
```

## 🚀 Deploy

### Vercel

O projeto está configurado para deploy no Vercel. O arquivo `vercel.json` já está configurado corretamente.

#### Deploy via CLI:
```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

#### Deploy via GitHub:
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
3. O deploy será automático a cada push

### Railway

O projeto está configurado para deploy no Railway com o arquivo `railway.json`.

#### Deploy via CLI:
```bash
# Instalar Railway CLI (se não tiver)
npm i -g @railway/cli

# Fazer login
railway login

# Criar novo projeto
railway init

# Deploy
railway up
```

#### Deploy via GitHub:
1. Conecte seu repositório ao Railway
2. Configure as variáveis de ambiente no painel do Railway:
   - `DATABASE_URL` (obtida do serviço PostgreSQL do Railway)
   - `JWT_SECRET` (crie uma chave secreta forte)
3. O deploy será automático a cada push

#### Comandos Railway Específicos:
- `yarn railway-tsx`: Comando de inicialização recomendado para Railway
- `yarn railway-simple`: Alternativa mais simples
- `yarn railway-tsc`: Build com TypeScript

### Outras plataformas

Para outras plataformas, certifique-se de:
1. Usar Node.js >= 18.0.0
2. Configurar as variáveis de ambiente
3. Executar `yarn build` antes do deploy
4. Usar `yarn start` para iniciar o servidor

## 📁 Estrutura do Projeto

```
src/
├── controllers/     # Controladores da aplicação
│   ├── occurrence/  # Controladores de ocorrências
│   ├── product/     # Controladores de produtos
│   └── users/       # Controladores de usuários
├── modules/         # Módulos da aplicação
│   ├── occurrence/  # Módulo de ocorrências
│   ├── product/     # Módulo de produtos
│   └── users/       # Módulo de usuários
├── routes/          # Rotas da API
├── shared/          # Código compartilhado
│   ├── errors/      # Sistema de tratamento de erros
│   ├── hooks/       # Hooks do Fastify
│   ├── lib/         # Bibliotecas (Prisma Client)
│   ├── middlewares/ # Middlewares (Auth, etc.)
│   ├── schemas/     # Schemas de validação
│   └── utils/       # Utilitários
└── server.ts        # Arquivo principal do servidor
```

## 🔧 Melhorias Implementadas

### ✅ Configuração do Prisma Client
- Singleton pattern para melhor performance
- Graceful shutdown
- Logs configuráveis por ambiente
- Tratamento de erros de conexão

### ✅ Sistema de Autenticação JWT
- Middleware de autenticação aprimorado
- Tratamento de erros JWT específicos
- Interface TypeScript para usuário autenticado
- Tokens com expiração de 24h

### ✅ Validação de Dados
- Schemas de validação para todos os endpoints
- Validação automática de tipos e formatos
- Mensagens de erro em português
- Validação de campos obrigatórios

### ✅ Sistema de Tratamento de Erros
- Classes de erro customizadas
- Tratamento centralizado de erros
- Logs estruturados
- Respostas de erro padronizadas

### ✅ Documentação Automática
- Swagger/OpenAPI integrado
- Documentação interativa em `/docs`
- Schemas de request/response
- Autenticação JWT documentada

### ✅ Estrutura de Rotas Otimizada
- Versionamento da API (`/api/v1`)
- Prefixos organizados por módulo
- Rotas RESTful
- Middleware de autenticação aplicado

## 📚 Documentação da API

Acesse a documentação interativa em:
- **Desenvolvimento**: `http://localhost:3336/docs`
- **Produção**: `https://formcam-api.vercel.app/docs`

## 🔐 Endpoints da API

### Autenticação
- `POST /api/v1/login` - Login de usuário

### Usuários
- `POST /api/v1/users/create_user` - Criar usuário
- `PUT /api/v1/users/update_user/:id` - Atualizar usuário (Auth)
- `DELETE /api/v1/users/delete_user/:id` - Deletar usuário (Auth)

### Ocorrências
- `POST /api/v1/occurrences/` - Criar ocorrência (Auth)

### Produtos
- `POST /api/v1/products/` - Criar produto (Auth)

### Health Check
- `GET /health` - Status da API

## 🔒 Variáveis de Ambiente

- `DATABASE_URL`: URL de conexão com o PostgreSQL
- `JWT_SECRET`: Chave secreta para JWT
- `PORT`: Porta do servidor (padrão: 3336)

## 📝 Scripts Disponíveis

- `yarn dev`: Inicia o servidor em modo desenvolvimento
- `yarn build`: Gera o build de produção
- `yarn start`: Inicia o servidor de produção
- `yarn vercel-build`: Build específico para Vercel
- `yarn railway-tsx`: Comando de inicialização recomendado para Railway