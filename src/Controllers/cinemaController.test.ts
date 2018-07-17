const cinemaController = require('./cinemaController');

describe('cinemaController', () => {
  const db = {
    getAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([{ id: 1, 'something big': true }])),
    find: jest
      .fn()
      .mockReturnValue(Promise.resolve({ id: 1, 'something big': true })),
    update: jest
      .fn()
      .mockReturnValue(
        Promise.resolve({
          _id: 1,
          name: 'Chill cinema',
          description: 'A nice place'
        })
      ),
    delete: jest
      .fn()
      .mockReturnValue(
        Promise.resolve({
          _id: 1,
          name: 'Chill cinema',
          description: 'A nice place'
        })
      ),
    create: jest
      .fn()
      .mockReturnValue(
        Promise.resolve({
          _id: 1,
          name: 'Chill cinema',
          description: 'A nice place'
        })
      )
  };

  describe('getCinemas', () => {
    const req = {};
    const res = { status: jest.fn(), send: jest.fn() };

    beforeEach(() => {
      res.status.mockClear();
      res.send.mockClear();
    });

    const response = [{ id: 1, 'something big': true }];
    it('calls res.send, res.status, and returns a 200', async () => {
      await cinemaController.getCinemas(db)(req, res);
      expect(db.getAll).toBeCalledWith('Cinema');
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith(response);
    });

    it('returns a 500 when there is a non CastError error', async () => {
      const error = new Error('words');
      const errorDb = {
        getAll: jest.fn().mockReturnValue(Promise.reject(error))
      };
      await cinemaController.getCinemas(errorDb)(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });

    it('returns a 400 when there is a CastError error', async () => {
      const error = new Error('words');
      error.name = 'CastError';
      const errorDb = {
        getAll: jest.fn().mockReturnValue(Promise.reject(error))
      };
      await cinemaController.getCinemas(errorDb)(req, res);
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

    it('calls res.send, res.status, and returns a 200', async () => {
      const response = { id: 1, 'something big': true };
      await cinemaController.getCinema(db)(req, res);
      expect(db.find).toBeCalledWith('Cinema', 'test ID');
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith(response);
    });

    it('returns a 500 when there is a non CastError error', async () => {
      const error = new Error('words');
      const errorDb = {
        find: jest.fn().mockReturnValue(Promise.reject(error))
      };
      await cinemaController.getCinema(errorDb)(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith('There was an error: Error: words');
    });

    it('returns a 400 when there is a CastError error', async () => {
      const error = new Error('words');
      error.name = 'CastError';
      const errorDb = {
        find: jest.fn().mockReturnValue(Promise.reject(error))
      };
      await cinemaController.getCinema(errorDb)(req, res);
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

    it('calls res.send, res.status, and returns a 200', async () => {
      await cinemaController.updateCinema(db)(req, res);
      expect(db.update).toBeCalledWith('Cinema', 'test ID', 'test body');
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith('Chill cinema updated');
    });

    it('returns a 500 when cinema lookup fails with non CastError', async () => {
      const error = new Error('words');
      const errorDb = {
        update: jest.fn().mockReturnValue(Promise.reject(error))
      };
      await cinemaController.updateCinema(errorDb)(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });

    it('returns a 400 when cinema lookup fails with CastError', async () => {
      const error = new Error('words');
      error.name = 'CastError';
      const errorDb = {
        update: jest.fn().mockReturnValue(Promise.reject(error))
      };
      await cinemaController.updateCinema(errorDb)(req, res);
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

    it('calls res.send, res.status, and returns a 200', async () => {
      await cinemaController.deleteCinema(db)(req, res);
      expect(db.delete).toBeCalledWith('Cinema', 'test ID');
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith('Chill cinema was deleted');
    });

    it('returns a 500 when cinema lookup fails with non CastError', async () => {
      const error = new Error('words');
      const errorDb = {
        delete: jest.fn().mockReturnValue(Promise.reject(error))
      };
      await cinemaController.deleteCinema(errorDb)(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });

    it('returns a 400 when cinema lookup fails with CastError', async () => {
      const error = new Error('words');
      error.name = 'CastError';
      const errorDb = {
        delete: jest.fn().mockReturnValue(Promise.reject(error))
      };
      await cinemaController.deleteCinema(errorDb)(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });
  });

  describe('createCinema', () => {
    const req = { params: { id: 1 } };
    const res = { status: jest.fn(), send: jest.fn() };

    beforeEach(() => {
      res.status.mockClear();
      res.send.mockClear();
    });

    it('calls res.send, res.status, and returns a 201', async () => {
      await cinemaController.createCinema(db)(req, res);
      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalledWith('Chill cinema was saved');
    });

    it('returns a 500 when there is a non ValidationError error', async () => {
      const error = new Error('words');
      const errorDb = {
        create: jest.fn().mockReturnValue(Promise.reject(error))
      };
      await cinemaController.createCinema(errorDb)(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });

    it('returns a 400 when there is a ValidationError error', async () => {
      const error = new Error('words');
      error.name = 'ValidationError';
      const errorDb = {
        create: jest.fn().mockReturnValue(Promise.reject(error))
      };
      await cinemaController.createCinema(errorDb)(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith(`There was an error: ${error}`);
    });
  });
});
