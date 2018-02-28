const express = require('express');
const router = express.Router();
const cinemaController = require('../Controllers/cinemaController');

router.post('/cinemas', (req, res) => {
  cinemaController.createCinema(req, res)
})

router.get('/cinemas', (req, res) => {
  cinemaController.getCinemas(req, res)
})

router.get('/cinemas/:id', (req, res) => {
  cinemaController.getCinema(req, res)
})

module.exports = router;