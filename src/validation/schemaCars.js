const yup = require("./yupConfig");

const schemaRegisterCar = yup.object().shape({
  nome: yup.string().required(),
  marca: yup.string().required(),
  estado: yup.string().required(),
  ano: yup.string().required(),
  valor: yup.number().required(),
});

module.exports = {
  schemaRegisterCar,
};
