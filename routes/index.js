const express = require('express');
const router = express.Router();
const {
  createCinema, getCinemas, getCinema, deleteCinema, updateCinema
} = require('../Controllers/cinemaController');

router.post('/cinemas', (req, res) => {
  createCinema(req, res);
});

router.get('/cinemas', (req, res) => {
  getCinemas(req, res);
});

router.get('/cinemas/:id', (req, res) => {
  getCinema(req, res);
});

router.delete('/cinemas/:id', (req, res) => {
  deleteCinema(req, res);
});

router.put('/cinemas/:id', (req, res) => {
  updateCinema(req, res);
});

module.exports = router;
