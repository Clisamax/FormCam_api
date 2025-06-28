# MaxCam API

Backend da aplicação MaxCam desenvolvido com Fastify, TypeScript e Prisma.

## 🚀 Tecnologias

- **Node.js** >= 18.0.0
- **Fastify** - Framework web
- **TypeScript** - Linguagem de programação
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- Yarn ou npm
- PostgreSQL

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd maxcam_api
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

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
3. O deploy será automático a cada push

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
├── modules/         # Módulos da aplicação
├── routes/          # Rotas da API
├── shared/          # Código compartilhado
└── server.ts        # Arquivo principal do servidor
```

## 🔒 Variáveis de Ambiente

- `DATABASE_URL`: URL de conexão com o PostgreSQL
- `JWT_SECRET`: Chave secreta para JWT
- `PORT`: Porta do servidor (padrão: 3336)

## 📝 Scripts Disponíveis

- `yarn dev`: Inicia o servidor em modo desenvolvimento
- `yarn build`: Gera o build de produção
- `yarn start`: Inicia o servidor de produção
- `yarn vercel-build`: Build específico para Vercel