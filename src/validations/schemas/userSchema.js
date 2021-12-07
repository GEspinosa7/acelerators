const yup = require('../settings');

const createUserSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  pass: yup.string().required()
});

const schemaLogin = yup.object().shape({
  email: yup.string().email().required(),
  pass: yup.string().required(),
});


module.exports = {
  createUserSchema,
  schemaLogin
};