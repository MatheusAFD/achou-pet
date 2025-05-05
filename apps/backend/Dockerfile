
FROM node:22-slim AS development

RUN npm install -g pnpm

WORKDIR /usr/src/app
COPY . .

RUN pnpm install -f

RUN pnpm db:generate

EXPOSE 3000

CMD ["pnpm", "start:dev"]
