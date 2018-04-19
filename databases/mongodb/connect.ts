import mongoose from 'mongoose';
import './Models/Cinema';

const mongoUrl: any = process.env.DB_URL;

const connect = () => {
  mongoose.connect(mongoUrl);
  mongoose.connection.on('error', (err: Error) => {
    console.error(`Error: ${err.message}`); // eslint-disable-line
  });
};

export default connect;
