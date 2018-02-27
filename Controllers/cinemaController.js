const mongoose = require('mongoose');
const Cinema = mongoose.model('Cinema');

exports.createCinema = async (req, res) => {
  const cinema = new Cinema(req.body)
  await cinema.save();
  console.log('It worked!');
}