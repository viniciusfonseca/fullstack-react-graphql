FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm run build

COPY . .

EXPOSE 4000

RUN npm run start:prod