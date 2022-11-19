const knex = require("../database/connection");
const { schemaRegisterCar } = require("../validation/schemaCars");

const registerCar = async (req, res) => {
  const { id } = req.usuario;

  try {
    schemaRegisterCar.validate(req.body);

    const data = {
      ...req.body,
      usuario_id: id,
    };

    const car = await knex("carros").insert(data);

    if (car.length === 0) {
      return res.status(400).json("O carro não foi cadastrado.");
    }

    return res.status(200).json("O caro foi cadastrado com sucesso.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  registerCar,
};
