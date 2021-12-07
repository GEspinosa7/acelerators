const knex = require('../database/conection');
const jwt = require('jsonwebtoken');

const loginAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).json({ erro: 'Token não informado' });

  try {
    const token = authorization.replace('Bearer', '').trim();

    const { id } = jwt.verify(token, process.env.TOKEN);

    const user = await knex('users').where('id', id).first();
    if (!user) return res.status(404).json({ erro: 'Este usuário não foi encontrado' });

    const { senha: userPassword, ...data } = user;

    req.user = data;

    next();
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = loginAuth;