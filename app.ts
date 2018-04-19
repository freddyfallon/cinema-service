require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes/index';
import connect from './databases/mongodb/connect';

const app = express();

app.use(helmet());
app.use(bodyParser.json());

connect();


app.use('/', routes);

app.set('port', 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Cinema service running → PORT ${server.address().port}`); // eslint-disable-line
});
