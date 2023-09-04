FROM node:18-alpine
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

ARG NODE_ENV DB_USER DB_PASS DB_HOST DB_PORT DB_NAME

ENV DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public&connect_timeout=60
COPY ./.env.${NODE_ENV} /app/.env
RUN rm .env.development .env.production

RUN pnpm prisma generate

RUN pnpm prisma migrate deploy

RUN pnpm prisma db seed

RUN pnpm build

EXPOSE 80

CMD ["npm", "run", "start"]
