import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import YAML from 'yamljs';
import path from 'path';
import swaggerTools from 'swagger-tools';
import routes from './routes/index';
import connect from './databases/mongodb/connect';

const swaggerDoc = YAML.load(path.join(__dirname, '/Swagger/swagger.yml'));
const app = express();

swaggerTools.initializeMiddleware(swaggerDoc, middleware => {
  app.use(middleware.swaggerMetadata());

  app.use(middleware.swaggerValidator());

  app.use(middleware.swaggerUi());

  app.use(helmet());
  app.use(bodyParser.json());

  connect();

  app.use('/', routes);

  app.set('port', 7777);

  const server = app.listen(app.get('port'), () => {
    console.log(`Cinema service running → PORT ${server.address().port}`); // eslint-disable-line
  });
});
