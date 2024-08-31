FROM oven/bun:alpine

WORKDIR /app

COPY ../server ./
COPY ../pocketbase/*.ts /app/pocketbase/

RUN bun install

CMD ["bun", "run", "start"]
