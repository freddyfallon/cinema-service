const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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

module.exports = mongoose.model('Cinema', cinemaSchema);
