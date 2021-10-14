FROM node:10-alpine

ADD . /app/

WORKDIR /app

RUN yarn

EXPOSE 7003

CMD ["node", "boot.js"]
