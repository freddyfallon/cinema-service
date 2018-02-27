require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());
module.exports = app;

mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🚫  ${err.message}`);
});

app.set('port', 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});