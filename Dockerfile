FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

ARG NODE_ENV

COPY .env.${NODE_ENV} ./.env

COPY . .

RUN rm .env.test .env.development .env.production

RUN rm -rf .next/ dist/

RUN yarn install --frozen-lockfile

RUN yarn lint --fix

RUN yarn prisma generate

RUN yarn build

EXPOSE 9015

CMD ["npm", "run", "dev"]
