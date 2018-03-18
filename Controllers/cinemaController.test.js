require('../Models/Cinema');
const mongoose = require('mongoose');
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

    test('returns a 500 when there is a failure', async () => {
      Cinema.find = jest.fn().mockReturnValue(Promise.reject(Error('words')));
      await cinemaController.getCinemas(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith('There was an error: Error: words');
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

    test('returns a 500 when there is a failure', async () => {
      Cinema.findById = jest.fn().mockReturnValue(Promise.reject(Error('words')));
      await cinemaController.getCinema(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith('There was an error: Error: words');
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

    test('returns a 500 when cinema lookup fails', async () => {
      Cinema.findById = jest.fn().mockReturnValue(Promise.reject(Error('words')));
      await cinemaController.updateCinema(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith('There was an error: Error: words');
    });

    test('returns a 500 when cinema update fails', async () => {
      const response = { _id: 1, name: 'Chill cinema', description: 'A nice place' };
      Cinema.findById = jest.fn().mockReturnValue(Promise.resolve(response));
      Cinema.update = jest.fn().mockReturnValue(Promise.reject(Error('words')));
      await cinemaController.updateCinema(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith('There was an error: Error: words');
    });
  });
});
