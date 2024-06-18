FROM node:20-alpine as dev

WORKDIR /src

COPY package*.json /

COPY . .

RUN npm install

CMD ["node","app.js"]