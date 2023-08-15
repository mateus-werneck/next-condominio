FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app/dashboard

COPY package.json yarn.lock ./

COPY . .

RUN yarn install --frozen-lockfile

RUN echo "yarn prisma generate"

RUN yarn prisma generate

EXPOSE 9015

CMD ["npm", "run", "dev"]
