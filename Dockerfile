FROM node:22.18.0-alpine3.22 AS build
COPY . /app
WORKDIR /app

RUN npm install -g pnpm@latest-10

RUN pnpm install
RUN pnpm run build

FROM node:22.18.0-alpine3.22 AS prod-deps

COPY . /app
WORKDIR /app

RUN npm install -g pnpm@latest-10

RUN pnpm install --prod

FROM node:22.18.0-alpine3.22

ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs
USER nodeuser

EXPOSE 8080

CMD ["node", "/app/dist/server.js"]
