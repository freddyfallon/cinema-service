require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./Swagger/swagger.yml');
const routes = require('./routes/index');
const connect = require('./databases/mongodb/connect');

app.use(helmet());
app.use(bodyParser.json());

connect();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/', routes);

app.set('port', 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Cinema service running → PORT ${server.address().port}`); // eslint-disable-line
});
