FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .

COPY package*.json ./

EXPOSE 4000

RUN npm run start:prod