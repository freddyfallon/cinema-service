const mongoose = require('mongoose');
const slug = require('slugs');
mongoose.Promise = global.Promise;

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a cinema name'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  capacity: {
    type: Number,
    required: 'Please enter a capacity'
  }
});

cinemaSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return
  }
  this.slug = slug(this.name);
  next();
})

module.exports = mongoose.model('Cinema', cinemaSchema);
