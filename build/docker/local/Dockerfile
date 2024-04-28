FROM node:18.18-alpine

WORKDIR /app

COPY ./playground/package*.json ./
RUN npm install

COPY ./playground .

EXPOSE 3000

CMD npm run dev