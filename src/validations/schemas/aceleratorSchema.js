const yup = require('../settings');

const createAceleratorSchema = yup.object().shape({
  title: yup.string().required(),
  descri: yup.string().required(),
  git_url: yup.string(),
  types_id: yup.number().required(),
  modules_id: yup.number().required()
});

const updateAceleratorSchema = yup.object().shape({
  title: yup.string(),
  descri: yup.string(),
  git_url: yup.string(),
});

module.exports = {
  createAceleratorSchema,
  updateAceleratorSchema
};