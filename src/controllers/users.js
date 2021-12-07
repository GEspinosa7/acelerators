const knex = require('../database/conection');
const bcrypt = require('bcrypt');
const { createUserSchema } = require('../validations/schemas/userSchema');
const emailValidator = require('../validations/email');

const createUser = async (req, res) => {
  const { username, email, pass } = req.body;

  try {
    await createUserSchema.validate(req.body);

    const emailAlreadyExists = await emailValidator(email);
    if (emailAlreadyExists) return res.status(400).json({ erro: emailAlreadyExists });

    const cryptedPass = await bcrypt.hash(pass, 10);

    const newUser = {
      username,
      email,
      pass: cryptedPass
    }

    const { rowCount } = await knex('users').insert(newUser);
    if (rowCount === 0) return res.ststus(400).json({ erro: 'Não foi possível cadastrar este registro' });

    const { pass: userPassword, ...data } = newUser;

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = { createUser };