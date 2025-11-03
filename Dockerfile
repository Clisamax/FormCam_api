# ===================================================================================
# Estágio 1: BUILDER - Instala dependências e compila o código
# ===================================================================================
# Usamos --platform=linux/amd64 para garantir que a imagem seja compatível com
# a maioria dos ambientes de produção (Linux Intel/AMD), mesmo rodando em um Mac M4.
FROM --platform=linux/amd64 node:20-slim AS builder
 
WORKDIR /usr/src/app
 
# Habilita o corepack para gerenciar o yarn.
RUN corepack enable
 
# Instala as ferramentas de build necessárias para compilar dependências nativas (ex: bcrypt).
RUN apt-get update && apt-get install -y build-essential python3 make --no-install-recommends
 
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
 
# Compila o código TypeScript para JavaScript.
RUN yarn build
 
# ===================================================================================
# Estágio 2: RUNNER - Cria a imagem final de produção, leve e otimizada
# ===================================================================================
FROM --platform=linux/amd64 node:20-slim
 
WORKDIR /usr/src/app
 
RUN corepack enable
 
COPY package.json yarn.lock ./
 
# Copia a pasta prisma ANTES de instalar as dependências para que o `postinstall` funcione.
COPY --from=builder /usr/src/app/prisma ./prisma
 
# Instala SOMENTE as dependências de produção para manter a imagem pequena.
RUN yarn install --production
 
# Copia os artefatos construídos do estágio 'builder'.
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
 
# Expõe a porta que a aplicação usa
EXPOSE 3336
 
# Comando para iniciar o servidor de produção
CMD ["yarn", "start"]