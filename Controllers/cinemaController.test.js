require('../Models/Cinema');
const mongoose = require('mongoose');
const Cinema = mongoose.model('Cinema');
const cinemaController = require('./cinemaController');

const response = { id: 1, 'something big': true };
Cinema.find = jest.fn().mockReturnValue(Promise.resolve(response));
const req = {};
const res = { status: jest.fn(), send: jest.fn() };

beforeEach(() => {
  Cinema.find.mockClear();
  res.status.mockClear();
  res.send.mockClear();
});

describe('cinemaController', () => {
  describe('getCinemas', () => {
    it('calls res.send, res.status, and returns a 200', async () => {
      await cinemaController.getCinemas(req, res);
      expect(Cinema.find.mock.calls[0]).toEqual([{}]);
      expect(res.status.mock.calls[0]).toEqual([200]);
      expect(res.send.mock.calls[0][0]).toBe(response);
    });

    it('it returns a 500 when there is a failure', async () => {
      Cinema.find = jest.fn().mockReturnValue(Promise.reject(response));
      await cinemaController.getCinemas(req, res);
      expect(res.status.mock.calls[0]).toEqual([500]);
    });
  });
});
