FROM oven/bun:latest AS build

WORKDIR /app

COPY ./package.json .
COPY ./bun.lockb .

RUN bun install

WORKDIR /app/pocketbase

COPY ./pocketbase/*.ts .

WORKDIR /app/web

COPY ./web/package.json .
COPY ./web/bun.lockb .

RUN bun install

WORKDIR /app/web

COPY ./web .

RUN bun run build



FROM nginx:alpine

COPY --from=build /app/web/dist /usr/share/nginx/html

EXPOSE 80
