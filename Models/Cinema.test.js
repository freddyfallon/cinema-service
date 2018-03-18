const Cinema = require('./Cinema');

describe('Cinema', () => {
  test('returns an error if name is not passed', async () => {
    const cinema = new Cinema({ description: 'good', capacity: 1 });
    try {
      const response = await cinema.validate();
      expect(response).not.toEqual(undefined);
    } catch (err) {
      expect(err.errors.name.message).toEqual('Please enter a cinema name');
    }
  });

  test('returns an error if description is not passed', async () => {
    const cinema = new Cinema({ name: 'Average place', capacity: 1 });
    try {
      const response = await cinema.validate();
      expect(response).not.toEqual(undefined);
    } catch (err) {
      expect(err.errors.description.message).toEqual('Please enter a description');
    }
  });

  test('returns an error if capacity is not passed', async () => {
    const cinema = new Cinema({ name: 'Average place', description: 'Average' });
    try {
      const response = await cinema.validate();
      expect(response).not.toEqual(undefined);
    } catch (err) {
      expect(err.errors.capacity.message).toEqual('Please enter a capacity');
    }
  });

  test('validates if passed a name, description, and a capacity', async () => {
    const cinema = new Cinema({ name: 'Average place', description: 'Average', capacity: 300 });
    try {
      const response = await cinema.validate();
      expect(response).toEqual(undefined);
    } catch (err) {
      expect(err).toBeFalsy();
    }
  });
});
