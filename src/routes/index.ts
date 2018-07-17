import express from 'express';
const router = express();

const {
  getCinemas, createCinema, getCinema, updateCinema, deleteCinema
} = require('../Controllers/cinemaController');
const database = require('../databases/mongodb/database');


router.post('/cinemas', (req: express.Request, res: express.Response) => {
  createCinema(database)(req, res);
});

router.get('/cinemas', (req: express.Request, res: express.Response) => {
  getCinemas(database)(req, res);
});

router.get('/cinemas/:id', (req: express.Request, res: express.Response) => {
  getCinema(database)(req, res);
});

router.delete('/cinemas/:id', (req: express.Request, res: express.Response) => {
  deleteCinema(database)(req, res);
});

router.put('/cinemas/:id', (req: express.Request, res: express.Response) => {
  updateCinema(database)(req, res);
});

export default router;
