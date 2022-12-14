const yup = require("./yupConfig");

const schemaRegisterUser = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().required().email(),
  senha: yup.string().required().min(6).max(10).trim(),
});

module.exports = {
  schemaRegisterUser,
};
