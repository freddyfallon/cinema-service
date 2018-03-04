const Cinema = require('./Cinema');

describe('Cinema', () => {
  it('Should return an error if name is not passed', async () => {
    const cinema = new Cinema({ description: 'good', capacity: 1 });
    try {
      const response = await cinema.validate();
      expect(response).not.toEqual(undefined);
    } catch (err) {
      expect(err.errors.name.message).toEqual('Please enter a cinema name');
    }
  });

  it('Should return an error if description is not passed', async () => {
    const cinema = new Cinema({ name: 'Average place', capacity: 1 });
    try {
      const response = await cinema.validate();
      expect(response).not.toEqual(undefined);
    } catch (err) {
      expect(err.errors.description.message).toEqual('Please enter a description');
    }
  });

  it('Should return an error if capacity is not passed', async () => {
    const cinema = new Cinema({ name: 'Average place', description: 'Average' });
    try {
      const response = await cinema.validate();
      expect(response).not.toEqual(undefined);
    } catch (err) {
      expect(err.errors.capacity.message).toEqual('Please enter a capacity');
    }
  });

  it('Should validate if passed a name, description, and a capacity', async () => {
    const cinema = new Cinema({ name: 'Average place', description: 'Average', capacity: 300 });
    try {
      const response = await cinema.validate();
      expect(response).toEqual(undefined);
    } catch (err) {
      expect(err).toBeFalsy();
    }
  });
});
