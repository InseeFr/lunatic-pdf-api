FROM node:24.13.0-alpine3.23 AS build
COPY . /app
WORKDIR /app

RUN npm install -g pnpm@latest-10

RUN pnpm install
RUN pnpm run build

FROM node:24.13.0-alpine3.23 AS prod-deps

COPY . /app
WORKDIR /app

RUN npm install -g pnpm@latest-10

RUN pnpm install --prod

FROM dhi.io/node:24.13.0-alpine3.23

ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

ENV NODE_UID=10001
ENV NODE_USER=nodeuser

RUN addgroup -g ${NODE_UID} ${NODE_USER} && \
    adduser -D -u ${NODE_UID} -G ${NODE_USER} ${NODE_USER}

USER ${NODE_UID}

EXPOSE 8080

CMD ["node", "/app/dist/server.js"]
