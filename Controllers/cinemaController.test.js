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
});
