const knex = require("../database/connection");
const { schemaRegisterSeller } = require("../validation/schemaSellers");

const registerSeller = async (req, res) => {
  const { id } = req.usuario;

  try {
    schemaRegisterSeller.validate(req.body);

    const data = {
      ...req.body,
      usuario_id: id,
    };

    const seller = await knex("vendedores").insert(data);

    if (seller.length === 0) {
      return res.status(400).json("O vendedor não foi cadastrado.");
    }

    return res.status(200).json("O vendedor foi cadastrado com sucesso.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const ListSellers = async (req, res) => {};

const detailSeller = async (req, res) => {};

module.exports = {
  registerSeller,
  ListSellers,
  detailSeller,
};
