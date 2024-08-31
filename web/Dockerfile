FROM oven/bun:latest AS build

WORKDIR /app/web

COPY ./web/package.json .
COPY ./web/bun.lockb .

RUN bun install


COPY ./web/index.html .
COPY ./web/vite.config.ts .
COPY ./web/postcss.config.cjs .
COPY ./web/src .
COPY ./web/public .

WORKDIR /app/pocketbase

COPY ./pocketbase/*.ts .



WORKDIR /app/web

RUN bun run build



FROM nginx:alpine

COPY --from=build /app/web/dist /usr/share/nginx/html

EXPOSE 80
