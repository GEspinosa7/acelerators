const knex = require('../database/conection');
const { createAceleratorSchema, updateAceleratorSchema } = require('../validations/schemas/aceleratorSchema');

const createAcelerator = async (req, res) => {
  const data = req.body;

  try {
    await createAceleratorSchema.validate(data);

    const newAcelerator = await knex('acelerators').insert(data).returning('*');
    if (newAcelerator.rowCount === 0) return res.status(400).json({ erro: 'Não foi possível criar este registro, tente novamente' });

    return res.status(200).json(newAcelerator);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const listAcelerators = async (req, res) => {
  try {
    const acelerators = await knex('acelerators');

    return res.status(200).json(acelerators);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const getAcelerator = async (req, res) => {
  const { id } = req.params;

  try {
    const acelerator = await knex('acelerators').where({ id }).first();
    if (!acelerator) return res.status(404).json({ erro: "Este registro não foi encontrado" });

    return res.status(200).json(acelerator);

  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const updateAcelerator = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await updateAceleratorSchema.validate(data);

    const acelerator = await knex('acelerators').where({ id }).first();
    if (!acelerator) return res.status(404).json({ erro: "Registro não econtrado" });


    const updatedAcelerator = await knex('acelerators').update(data).where({ id }).returning('*');
    if (updatedAcelerator.rowCount === 0) return res.status(400).json({ erro: "Não foi possível atualizar este registro, tente novamente" });

    return res.status(200).json(updatedAcelerator[0]);

  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const deleteAcelerator = async (req, res) => {
  const { id } = req.params;

  try {
    const acelerator = await knex('acelerators').where({ id }).first();
    if (!acelerator) return res.status(404).json({ erro: "Este registro não foi encontrado" });

    const { rowCount } = await knex('acelerators').del().where({ id });
    if (rowCount === 0) return res.status(400).json({ erro: "Não foi possível deletar este registro, tente novamente" });

    return res.status(200).json({ sucesso: 'Registro excluído com sucesso' });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  createAcelerator,
  listAcelerators,
  getAcelerator,
  updateAcelerator,
  deleteAcelerator
}