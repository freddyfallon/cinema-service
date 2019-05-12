[![Greenkeeper badge](https://badges.greenkeeper.io/freddyfallon/cinema-service.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/freddyfallon/cinema-service/tree/master.svg?style=svg)](https://circleci.com/gh/freddyfallon/cinema-service/tree/master)

# Cinema Service

This is a REST service that talks to a MongoDB database alloing you to create, read, update and delete from it. It doesn't actually create real cinemas. 🎦 🍿 😱

It uses Node.js, Express, Mongoose, Jest, Docker, and TypeScript.

## Getting it running

The one prerequisite is that you must have Docker installed and running.

- Clone the repo
- `cd` into the directory
- run `npm install` to install all dependencies
- Then run `docker-compose up --build`

You should then be able to poke the different endpoints, which will be described in Swagger docs at [http://localhost:7777/docs/](http://localhost:7777/docs/)

## Running the tests

At the moment, there are just unit tests run through `npm test`.
