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

exports.getCinemas = async (req, res) => {
  const cinemas = await Cinema.find({}, (err, results) => {
    return results;
  });
  res.send(cinemas);
}

exports.getCinema = async (req, res) => {
  const cinema = await Cinema.findById(req.params.id, (err, result) => {
    return result
  })
  res.send(cinema);
}

exports.deleteCinema = async (req, res) => {
  const cinema = await Cinema.findById(req.params.id, (err, result) => {
    return result
  });

  await Cinema.remove({_id: cinema.id}, (err, result) => {
    return result;
  })
  
  res.send(`${cinema.name} was deleted`);
}