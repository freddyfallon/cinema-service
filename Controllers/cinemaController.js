const mongoose = require('mongoose');
const Cinema = mongoose.model('Cinema');

exports.createCinema = async (req, res) => {
  try {
    const cinema = new Cinema(req.body);
    await cinema.save();
    res.status(201);
    res.send(`${cinema.name} was saved`);
  } catch (err) {
    const errorCode = err.name === 'ValidationError' ? 400 : 500;
    res.status(errorCode);
    res.send(`There was an error: ${err.toString()}`);
  }
};

exports.getCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find({}, (err, results) => {
      return results;
    });
    res.status(200);
    res.send(cinemas);
  } catch (err) {
    const errorCode = err.name === 'CastError' ? 400 : 500;
    res.status(errorCode);
    res.send(`There was an error: ${err.toString()}`);
  }
};

exports.getCinema = async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id, (err, result) => {
      return result;
    });
    res.status(200);
    res.send(cinema);
  } catch (err) {
    const errorCode = err.name === 'CastError' ? 400 : 500;
    res.status(errorCode);
    res.send(`There was an error: ${err.toString()}`);
  }
};

exports.deleteCinema = async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id, (err, result) => {
      return result;
    });
    await Cinema.remove({ _id: cinema.id }, () => {
    });
    res.status(200);
    res.send(`${cinema.name} was deleted`);
  } catch (err) {
    const errorCode = err.name === 'CastError' ? 400 : 500;
    res.status(errorCode);
    res.send(`There was an error: ${err.toString()}`);
  }
};

exports.updateCinema = async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id, (err, result) => {
      return result;
    });
    await Cinema.update({ _id: cinema.id }, { $set: req.body }, () => {
    });
    res.status(200);
    res.send(`${cinema.name} updated`);
  } catch (err) {
    const errorCode = err.name === 'CastError' ? 400 : 500;
    res.status(errorCode);
    res.send(`There was an error: ${err.toString()}`);
  }
};

