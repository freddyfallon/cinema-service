const express = require('express');
const router = express.Router();
const cinemaController = require('../Controllers/cinemaController');

router.post('/cinemas', (req, res) => {
  cinemaController.createCinema(req);
})

module.exports = router;