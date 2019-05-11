import mongoose from 'mongoose';

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a cinema name'
  },
  description: {
    type: String,
    trim: true,
    required: 'Please enter a description'
  },
  capacity: {
    type: Number,
    required: 'Please enter a capacity'
  }
});

export default mongoose.model('Cinema', cinemaSchema);
