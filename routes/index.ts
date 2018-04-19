import express from 'express';
const router = express();

const {
  getCinemas, createCinema, getCinema, updateCinema, deleteCinema
} = require('../Controllers/cinemaController');
const database = require('../databases/mongodb/database');


router.post('/cinemas', (req, res) => {
  createCinema(database)(req, res);
});

router.get('/cinemas', (req, res) => {
  getCinemas(database)(req, res);
});

router.get('/cinemas/:id', (req, res) => {
  getCinema(database)(req, res);
});

router.delete('/cinemas/:id', (req, res) => {
  deleteCinema(database)(req, res);
});

router.put('/cinemas/:id', (req, res) => {
  updateCinema(database)(req, res);
});

export default router;
