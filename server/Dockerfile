FROM oven/bun:alpine

WORKDIR /app/server

COPY ./web/package.json .
COPY ./web/bun.lockb .

RUN bun install

COPY ./server .


WORKDIR /app/pocketbase

COPY ./pocketbase/*.ts .


WORKDIR /app/server

CMD ["bun", "run", "start"]
