import express from 'express';
import Database from '../interfaces/Database';

const getCinemas = (db: Database) => async (req: express.Request, res: express.Response) => {
  try {
    const cinemas = await db.getAll('Cinema');
    res.status(200);
    res.send(cinemas);
  } catch (err) {
    const errorCode = err.name === 'CastError' ? 400 : 500;
    res.status(errorCode);
    res.send(`There was an error: ${err.toString()}`);
  }
};

const getCinema = (db: Database) => async (req: express.Request, res: express.Response) => {
  try {
    const cinema = await db.find('Cinema', req.params.id);
    res.status(200);
    res.send(cinema);
  } catch (err) {
    const errorCode = err.name === 'CastError' ? 400 : 500;
    res.status(errorCode);
    res.send(`There was an error: ${err.toString()}`);
  }
};

const updateCinema = (db: Database) => async (req: express.Request, res: express.Response) => {
  try {
    const cinema = await db.update('Cinema', req.params.id, req.body);
    res.status(200);
    res.send(`${cinema.name} updated`);
  } catch (err) {
    const errorCode = err.name === 'CastError' ? 400 : 500;
    res.status(errorCode);
    res.send(`There was an error: ${err.toString()}`);
  }
};

const createCinema = (db: Database) => async (req: express.Request, res: express.Response) => {
  try {
    const cinema = await db.create('Cinema', req.body);
    res.status(201);
    res.send(`${cinema.name} was saved`);
  } catch (err) {
    const errorCode = err.name === 'ValidationError' ? 400 : 500;
    res.status(errorCode);
    res.send(`There was an error: ${err.toString()}`);
  }
};

const deleteCinema = (db: Database) => async (req: express.Request, res: express.Response) => {
  try {
    const cinema = await db.delete('Cinema', req.params.id);
    res.status(200);
    res.send(`${cinema.name} was deleted`);
  } catch (err) {
    const errorCode = err.name === 'CastError' ? 400 : 500;
    res.status(errorCode);
    res.send(`There was an error: ${err.toString()}`);
  }
};

module.exports = {
  getCinemas, createCinema, getCinema, updateCinema, deleteCinema
};
