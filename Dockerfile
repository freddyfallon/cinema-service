FROM node:8

WORKDIR /app

ADD . /app

RUN yarn install

CMD yarn start

EXPOSE 3000
