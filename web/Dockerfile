FROM node:alpine

WORKDIR /usr/src/app

COPY . .
COPY .envdocker .env
RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]