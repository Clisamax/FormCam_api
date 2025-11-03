# ===================================================================================
# Estágio 1: BUILDER - Instala dependências e compila o código
# ===================================================================================
# Usamos a imagem node:20-slim base para garantir compatibilidade com
# a maioria dos ambientes de produção.
FROM node:20-slim AS builder
 
WORKDIR /usr/src/app
 
# Habilita o corepack para gerenciar o yarn.
RUN corepack enable
 
# Instala as ferramentas de build necessárias para compilar dependências nativas (ex: bcrypt) e OpenSSL para Prisma.
RUN apt-get update && apt-get install -y build-essential python3 make openssl --no-install-recommends
 
# Copia os arquivos de dependência para aproveitar o cache do Docker.
COPY package.json yarn.lock ./
 
# Copia a pasta do Prisma ANTES de instalar as dependências,
# pois o `postinstall` executa `prisma generate`.
COPY prisma ./prisma/
 
# Instala todas as dependências (incluindo as de desenvolvimento).
RUN yarn install
 
# Copia o restante do código-fonte.
COPY . .
 
# Gera o Prisma Client (já foi executado pelo `postinstall` do seu package.json, mas garantimos aqui).
RUN yarn prisma generate
 
# ===================================================================================
# Estágio 2: RUNNER - Cria a imagem final de produção, leve e otimizada
# ===================================================================================
FROM node:20-slim
 
WORKDIR /usr/src/app
 
RUN corepack enable
 
# Instala as ferramentas de build necessárias para compilar dependências nativas (ex: bcrypt) e OpenSSL para Prisma.
RUN apt-get update && apt-get install -y build-essential python3 make openssl --no-install-recommends
 
COPY package.json yarn.lock ./
 
# Copia a pasta prisma ANTES de instalar as dependências para que o `postinstall` funcione.
COPY --from=builder /usr/src/app/prisma ./prisma
 
# Instala TODAS as dependências para evitar problemas com módulos externos
RUN yarn install
 
# Copia todo o código-fonte.
COPY --from=builder /usr/src/app ./.
 
# Expõe a porta que a aplicação usa
EXPOSE 3339
 
# Comando para iniciar o servidor de produção
CMD ["yarn", "tsx", "src/server.ts"]