const yup = require("./yupConfig");

const schemaRegisterSale = yup.object().shape({
  carro_id: yup.number().required(),
  vendedor_id: yup.number().required(),
  data: yup.date().required(),
});

module.exports = {
  schemaRegisterSale,
};
