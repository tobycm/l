FROM oven/bun:latest AS build

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
COPY index.html ./
COPY vite.config.ts ./
COPY postcss.config.cjs ./
COPY src ./
COPY public ./

RUN bun install

RUN bun run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
