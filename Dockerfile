FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

COPY ./.env.production /app/.env
RUN rm .env.development .env.production

ARG DB_USER DB_PASS DB_HOST DB_PORT DB_NAME

ENV DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public&connect_timeout=60

RUN pnpm prisma generate

RUN pnpm prisma migrate dev

RUN pnpm prisma db seed

RUN pnpm build

FROM node:18-alpine AS runner

VOLUME ["/usr/app"] 

WORKDIR /usr/app

ARG DB_USER DB_PASS DB_HOST DB_PORT DB_NAME

ENV NODE_ENV=production DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public&connect_timeout=60

RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app

USER app

COPY --chown=app:app --from=builder /app/.next/standalone ./
COPY --chown=app:app --from=builder /app/public ./public
COPY --chown=app:app --from=builder /app/prisma ./prisma
COPY --chown=app:app --from=builder /app/.next/static ./.next/static

ENV PORT 80

EXPOSE 80

CMD ["node", "server.js"]
