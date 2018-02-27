const mongoose = require('mongoose');
const Cinema = mongoose.model('Cinema');

exports.createCinema = async (req, res) => {
  try {
    const cinema = new Cinema(req.body)
    await cinema.save();
    res.send(`${cinema.name} was saved`);
  } catch (err) {
    res.send(err.toString())
  } 
}

exports.getCinemas = async () => {
  const cinemas = Cinema.find();
  console.log(cinemas);
}