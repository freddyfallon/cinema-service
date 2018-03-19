const mongoose = require('mongoose');
require('./Models/Cinema');

const connect = () => {
  mongoose.connect(process.env.DB_URL);
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', (err) => {
    console.error(`Error: ${err.message}`); // eslint-disable-line
  });
};

module.exports = connect;
