const knex = require('../database/conection');

const emailValidator = async (email) => {
  const user = await knex('users').where('email', email);
  if (user.length > 0) return 'Este email ja está cadastrado';
};

module.exports = emailValidator;