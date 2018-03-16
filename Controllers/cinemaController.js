const mongoose = require('mongoose');
const Cinema = mongoose.model('Cinema');

module.exports = class cinemaController {
  static async getCinemas(req, res) {
    try {
      const cinemas = await Cinema.find({});
      res.status(200);
      res.send(cinemas);
    } catch (err) {
      const errorCode = err.name === 'CastError' ? 400 : 500;
      res.status(errorCode);
      res.send(`There was an error: ${err.toString()}`);
    }
  }

  static async getCinema(req, res) {
    try {
      const cinema = await Cinema.findById(req.params.id);
      res.status(200);
      res.send(cinema);
    } catch (err) {
      const errorCode = err.name === 'CastError' ? 400 : 500;
      res.status(errorCode);
      res.send(`There was an error: ${err.toString()}`);
    }
  }

  static async updateCinema(req, res) {
    try {
      const cinema = await Cinema.findById(req.params.id);
      await Cinema.update({ _id: cinema.id }, { $set: req.body }, () => {
      });
      res.status(200);
      res.send(`${cinema.name} updated`);
    } catch (err) {
      const errorCode = err.name === 'CastError' ? 400 : 500;
      res.status(errorCode);
      res.send(`There was an error: ${err.toString()}`);
    }
  }

  static async createCinema(req, res) {
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
  }

  static async deleteCinema(req, res) {
    try {
      const cinema = await Cinema.findById(req.params.id);
      await Cinema.remove({ _id: cinema.id }, () => {
      });
      res.status(200);
      res.send(`${cinema.name} was deleted`);
    } catch (err) {
      const errorCode = err.name === 'CastError' ? 400 : 500;
      res.status(errorCode);
      res.send(`There was an error: ${err.toString()}`);
    }
  }
};
