FROM node:22-alpine AS base

RUN corepack enable

#
# INSTALL STAGE
#
FROM base AS prod-deps

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

#
# BUILD STAGE
#
FROM base AS build

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
COPY .env ./
# Roda as migrations antes do build, exportando variáveis do .env
RUN set -a && . .env && pnpm run migrate
RUN pnpm run build

#
# PRODUCTION STAGE
#
FROM base

WORKDIR /usr/src/app
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/drizzle.config.ts ./dist/drizzle.config.ts

EXPOSE 4000
CMD ["pnpm", "run", "start:prod"]
