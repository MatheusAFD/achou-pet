
FROM node:22-alpine AS base
RUN corepack enable

FROM base AS prod-deps
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

FROM base AS build
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY .env ./
COPY . .

RUN pnpm add -D tsx

RUN pnpm exec drizzle-kit push --config=drizzle.config.ts --force



RUN pnpm run build

FROM base
WORKDIR /usr/src/app

COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/.env .env

EXPOSE 4000

CMD ["pnpm", "run", "start:prod"]
