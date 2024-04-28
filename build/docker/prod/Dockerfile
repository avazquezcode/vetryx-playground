FROM node:22-alpine3.18

WORKDIR /app

COPY ./playground/package*.json ./

RUN npm install

COPY ./playground .

RUN npm run build 

EXPOSE 3000

CMD npm run start