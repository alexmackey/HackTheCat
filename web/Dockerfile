FROM node:alpine

WORKDIR /usr/src/app

#COPY package*.json ./
#COPY assets/ assets/

#RUN ls -la assets/*

COPY . .
COPY .envdocker .env
RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]