FROM node:22-slim AS builder

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY . .

RUN pnpm install -f --prod=false
RUN pnpm build

FROM node:22-slim AS production

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/.env ./.env

# Remove .js.map files from migrations to evitar erro do Drizzle
RUN find ./src/drizzle/migrations -name "*.js.map" -delete

EXPOSE 4000

CMD ["node", "dist/src/main.js"]

