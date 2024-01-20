FROM node:18

WORKDIR /app

COPY package*.json ./

COPY .env.example ./.env

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build
