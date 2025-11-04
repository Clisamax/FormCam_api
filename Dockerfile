# ================================================================================
# Stage 1: BUILDER - instala dependências e compila o código (sem bundling)
# ================================================================================
FROM node:20-slim AS builder

WORKDIR /usr/src/app

# Habilita Corepack e ativa Yarn 1.x de forma estável
RUN corepack enable \
  && corepack prepare yarn@1.22.22 --activate

# Ferramentas necessárias para compilar dependências nativas (bcrypt) e OpenSSL p/ Prisma
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    openssl \
  && rm -rf /var/lib/apt/lists/*

# Copia manifestos e Prisma primeiro para aproveitar cache
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Instala TODAS as dependências (postinstall roda prisma generate)
RUN yarn install

# Copia o restante do código
COPY . .

# Compila usando TypeScript (sem bundling)
RUN yarn build

# ================================================================================
# Stage 2: RUNNER - imagem final de produção, leve
# ================================================================================
FROM node:20-slim AS runner

WORKDIR /usr/src/app

# Habilita Corepack/Yarn
RUN corepack enable \
  && corepack prepare yarn@1.22.22 --activate

# Dependências nativas em runtime (bcrypt) e OpenSSL para Prisma
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    openssl \
  && rm -rf /var/lib/apt/lists/*

# Copia apenas o necessário
COPY package.json yarn.lock ./
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/dist ./dist

# Instala apenas dependências de produção (postinstall -> prisma generate)
RUN yarn install --production

ENV NODE_ENV=production

# Exponha a porta usada pelo app (server.ts deve ler process.env.PORT da Railway)
EXPOSE 3339

# Executa migrações e sobe o servidor
CMD ["bash", "-lc", "npx prisma migrate deploy && node dist/server.js"]


