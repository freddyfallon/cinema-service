require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
require('./Models/Cinema');
const routes = require('./routes/index');

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});

app.use('/', routes);

app.set('port', 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});