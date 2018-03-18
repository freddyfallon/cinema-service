require('../Models/Cinema');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
const Cinema = mongoose.model('Cinema');
const cinemaController = require('./cinemaController');

describe('cinemaController', () => {
  describe('getCinemas', () => {
    const req = {};
    const res = { status: jest.fn(), send: jest.fn() };

    beforeEach(() => {
      res.status.mockClear();
      res.send.mockClear();
    });

    const response = [{ id: 1, 'something big': true }];
    Cinema.find = jest.fn().mockReturnValue(Promise.resolve(response));
    test('calls res.send, res.status, and returns a 200', async () => {
      await cinemaController.getCinemas(req, res);
      expect(Cinema.find).toBeCalledWith({});
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith(response);
    });

    test('returns a 500 when there is a non CastError error', async () => {
      const error = new Error('words');
      Cinema.find = jest.fn().mockReturnValue(Promise.reject(error));
      await cinemaController.getCinemas(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });

    test('returns a 400 when there is a CastError error', async () => {
      const error = new Error('words');
      error.name = 'CastError';
      Cinema.find = jest.fn().mockReturnValue(Promise.reject(error));
      await cinemaController.getCinemas(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });
  });

  describe('getCinema', () => {
    const req = { params: { id: 'test ID' } };
    const res = { status: jest.fn(), send: jest.fn() };

    beforeEach(() => {
      res.status.mockClear();
      res.send.mockClear();
    });

    test('calls res.send, res.status, and returns a 200', async () => {
      const response = { id: 1, 'something big': true };
      Cinema.findById = jest.fn().mockReturnValue(Promise.resolve(response));

      await cinemaController.getCinema(req, res);
      expect(Cinema.findById).toBeCalledWith('test ID');
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith(response);
    });

    test('returns a 500 when there is a non CastError error', async () => {
      const error = new Error('words');
      Cinema.findById = jest.fn().mockReturnValue(Promise.reject(error));
      await cinemaController.getCinema(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith('There was an error: Error: words');
    });

    test('returns a 400 when there is a CastError error', async () => {
      const error = new Error('words');
      error.name = 'CastError';
      Cinema.findById = jest.fn().mockReturnValue(Promise.reject(error));
      await cinemaController.getCinema(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });
  });

  describe('updateCinema', () => {
    const req = { params: { id: 'test ID' }, body: 'test body' };
    const res = { status: jest.fn(), send: jest.fn() };

    beforeEach(() => {
      res.status.mockClear();
      res.send.mockClear();
    });


    test('calls res.send, res.status, and returns a 200', async () => {
      const response = { _id: 1, name: 'Chill cinema', description: 'A nice place' };
      Cinema.findById = jest.fn().mockReturnValue(Promise.resolve(response));
      Cinema.update = jest.fn();

      await cinemaController.updateCinema(req, res);
      expect(Cinema.findById).toBeCalledWith('test ID');
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith(`${response.name} updated`);
    });

    test('returns a 500 when cinema lookup fails with non CastError', async () => {
      const error = new Error('words');
      Cinema.findById = jest.fn().mockReturnValue(Promise.reject(Error('words')));
      await cinemaController.updateCinema(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });

    test('returns a 400 when cinema lookup fails with CastError', async () => {
      const error = new Error('words');
      error.name = 'CastError';
      Cinema.findById = jest.fn().mockReturnValue(Promise.reject(error));
      await cinemaController.updateCinema(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });

    test('returns a 500 when cinema update fails with non CastError', async () => {
      const error = new Error('words');
      const response = { _id: 1, name: 'Chill cinema', description: 'A nice place' };
      Cinema.findById = jest.fn().mockReturnValue(Promise.resolve(response));
      Cinema.update = jest.fn().mockReturnValue(Promise.reject(error));
      await cinemaController.updateCinema(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });

    test('returns a 400 when cinema update fails with CastError', async () => {
      const error = new Error('words');
      error.name = 'CastError';
      const response = { _id: 1, name: 'Chill cinema', description: 'A nice place' };
      Cinema.findById = jest.fn().mockReturnValue(Promise.resolve(response));
      Cinema.update = jest.fn().mockReturnValue(Promise.reject(error));
      await cinemaController.updateCinema(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });
  });

  describe('deleteCinema', () => {
    const req = { params: { id: 'test ID' } };
    const res = { status: jest.fn(), send: jest.fn() };

    beforeEach(() => {
      res.status.mockClear();
      res.send.mockClear();
    });

    test('calls res.send, res.status, and returns a 200', async () => {
      const response = { _id: 1, name: 'Chill cinema', description: 'A nice place' };
      Cinema.findById = jest.fn().mockReturnValue(Promise.resolve(response));
      Cinema.remove = jest.fn();

      await cinemaController.deleteCinema(req, res);
      expect(Cinema.findById).toBeCalledWith('test ID');
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith(`${response.name} was deleted`);
    });

    test('returns a 500 when cinema lookup fails with non CastError', async () => {
      const error = new Error('words');
      Cinema.findById = jest.fn().mockReturnValue(Promise.reject(error));
      await cinemaController.deleteCinema(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });

    test('returns a 400 when cinema lookup fails with CastError', async () => {
      const error = new Error('words');
      error.name = 'CastError';
      Cinema.findById = jest.fn().mockReturnValue(Promise.reject(error));
      await cinemaController.deleteCinema(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });
  });

  describe('createCinema', () => {
    const req = { body: { name: 'Average cinema', description: 'Pretty average', capacity: 23 } };
    const res = { status: jest.fn(), send: jest.fn() };

    beforeEach(() => {
      res.status.mockClear();
      res.send.mockClear();
    });

    test('calls res.send, res.status, and returns a 201', async () => {
      mockingoose.Cinema.toReturn({}, 'save');
      await cinemaController.createCinema(req, res);
      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalledWith(`${req.body.name} was saved`);
    });

    test('returns a 500 when there is a non ValidationError error', async () => {
      const error = new Error('words');
      mockingoose.Cinema.toReturn(error, 'save');
      await cinemaController.createCinema(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });

    test('returns a 400 when there is a ValidationError error', async () => {
      const error = new Error('words');
      error.name = 'ValidationError';
      mockingoose.Cinema.toReturn(error, 'save');
      await cinemaController.createCinema(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });
  });
});
