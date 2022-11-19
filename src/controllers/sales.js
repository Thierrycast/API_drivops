const knex = require("../database/connection");
const { schemaRegisterSale } = require("../validation/schemaSales");

const registerSale = async (req, res) => {
  const { id } = req.usuario;

  try {
    schemaRegisterSale.validate(req.body);

    const data = {
      ...req.body,
      usuario_id: id,
    };

    const sale = await knex("vendas").insert(data);

    if (sale.length === 0) {
      return res.status(400).json("A venda não foi cadastrada.");
    }

    return res.status(200).json("A venda foi cadastrado com sucesso.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const ListSales = async (req, res) => {
  try {
    const allSales = await knex("vendas")
      .leftJoin("carros", "vendas.carro_id", "=", "carros.id")
      .leftJoin("vendedores", "vendas.vendedor_id", "=", "vendedores.id")
      .select("vendas.id", "modelo", "marca", "valor", "nome", "data");

    if (!allSales) {
      return res.status(400).json("Não foi possivel listar as vendas.");
    }

    return res.status(200).json(allSales);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detailSale = async (req, res) => {};

module.exports = {
  registerSale,
  ListSales,
  detailSale,
};
