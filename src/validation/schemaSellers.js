const yup = require("./yupConfig");

const schemaRegisterSeller = yup.object().shape({
  nome: yup.string().required(),
  idade: yup.number(),
  telefone: yup.string(),
});

module.exports = {
  schemaRegisterSeller,
};
