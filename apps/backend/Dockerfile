# Etapa base com pnpm e corepack
FROM node:22-alpine AS base
RUN corepack enable

#
# ETAPA 1: Dependências de produção
#
FROM base AS prod-deps
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

#
# ETAPA 2: Build + Migrations
#
FROM base AS build
WORKDIR /usr/src/app

# Copia arquivos de dependência e instala tudo (inclui devDeps como `tsx`)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copia o restante do projeto
COPY .env ./
COPY . .

# Adiciona tsx para rodar arquivos .ts diretamente no CLI
RUN pnpm add -D tsx

# Roda as migrations com Drizzle usando drizzle.config.ts e tsx
RUN pnpm exec drizzle-kit push --config=drizzle.config.ts --force



# Builda o projeto (geralmente algo como tsc ou next build)
RUN pnpm run build

#
# ETAPA 3: Imagem final de produção
#
FROM base
WORKDIR /usr/src/app

# Copia apenas o necessário
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/.env .env

# Exponha a porta (ajuste conforme necessário)
EXPOSE 4000

# Comando final para iniciar app em produção
CMD ["pnpm", "run", "start:prod"]
