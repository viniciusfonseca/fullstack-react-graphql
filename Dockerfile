FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./

RUN npm install
RUN npm run build

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:prod"]