const knex = require('../database/conection');

const getTypesList = async (req, res) => {
  try {
    const types = await knex('types');

    return res.status(200).json(types);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const getModulesList = async (req, res) => {
  try {
    const modules = await knex('modules');

    return res.status(200).json(modules);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  getTypesList,
  getModulesList
};