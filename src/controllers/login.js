const knex = require('../database/conection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { schemaLogin } = require('../validations/schemas/userSchema');

const login = async (req, res) => {
  const { email, pass } = req.body;

  try {
    await schemaLogin.validate(req.body);

    const user = await knex('users').where({ email }).first();
    if (!user) return res.status(404).json({ erro: 'Este usuário não foi encontrado' });

    const truePassword = await bcrypt.compare(pass, user.pass);
    if (!truePassword) return res.status(400).json({ erro: "O email ou senha estão incorretos" });

    const token = jwt.sign({ id: user.id }, process.env.TOKEN);

    const { pass: _, ...data } = user;

    return res.status(200).json({ user: data, token });

  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = { login }