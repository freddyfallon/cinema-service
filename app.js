require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./Swagger/swagger.yml');
require('./Models/Cinema');
const routes = require('./routes/index');

app.use(helmet());
app.use(bodyParser.json());
mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Error: ${err.message}`); // eslint-disable-line
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/', routes);

app.set('port', 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Cinema service running → PORT ${server.address().port}`); // eslint-disable-line
});
