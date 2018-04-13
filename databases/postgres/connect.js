const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize({
  database: 'cinema_service',
  username: 'frederickfallon',
  password: null,
  dialect: 'postgres',
  operatorsAliases: {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like
  }
});

const connect = async () => {
  try {
    await sequelize.authenticate;
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
};


module.exports = connect;
