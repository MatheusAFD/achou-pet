FROM node:22-slim AS builder

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY . .

RUN pnpm install

RUN pnpm db:generate
# Debug: List contents of migrations folder after generation
RUN echo "Contents of /usr/src/app/src/drizzle/migrations in builder:" && ls -R /usr/src/app/src/drizzle/migrations

RUN pnpm build

FROM node:22-slim AS production

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/src/drizzle/migrations ./migrations
# Debug: List contents of migrations folder after copying
RUN echo "Contents of /usr/src/app/migrations in production:" && ls -R /usr/src/app/migrations

EXPOSE 4000

CMD ["pnpm", "start"]
