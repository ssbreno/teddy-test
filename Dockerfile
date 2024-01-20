# Use the Node.js image as a base
FROM node:18

WORKDIR /app

COPY package*.json ./

COPY .env.example ./.env

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 3000

RUN pnpm run build

RUN pnpm prune --prod
