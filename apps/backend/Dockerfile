FROM node:22 AS development

WORKDIR /usr/src/app

COPY package*.json ./
# COPY pnpm-lock.yaml ./ # Uncomment if using pnpm
# COPY yarn.lock ./ # Uncomment if using yarn

RUN npm install --frozen-lockfile # Use --frozen-lockfile for npm v7+

COPY . .

RUN npm run build

FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
# COPY pnpm-lock.yaml ./ # Uncomment if using pnpm
# COPY yarn.lock ./ # Uncomment if using yarn

RUN npm install --frozen-lockfile --prod # Use --frozen-lockfile for npm v7+ and --prod to install only production dependencies

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/src/main"]
