import mongoose from 'mongoose';
import './Models/Cinema';

const connect = () => {
  mongoose.connect('mongodb://mongodb:27017/cinema-service');
  mongoose.connection.on('error', (err: Error) => {
    console.error(`Error: ${err.message}`); // eslint-disable-line
  });
};

export default connect;
