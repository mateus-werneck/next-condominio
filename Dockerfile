FROM node:18-alpine
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

ARG NODE_ENV
COPY ./.env.${NODE_ENV} /app/.env

RUN rm .env.development .env.production

RUN pnpm lint --fix

# RUN pnpm prisma migrate dev --name docker-build

# RUN pnpm prisma generate

# RUN pnpm prisma db push

# RUN pnpm prisma db seed


EXPOSE 9015

USER node

CMD ["npm", "run", "dev"]
