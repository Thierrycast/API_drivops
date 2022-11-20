const knex = require("../database/connection");
const { response } = require("../routes");

const rankSellers = async (req, res) => {
  try {
    const { rows } = await knex.raw(
      "SELECT vendedores.id, vendedores.nome, sum(carros.valor) as total FROM vendas INNER JOIN vendedores ON vendedores.id = vendas.vendedor_id left JOIN carros ON carros.id = vendas.carro_id group by vendedores.id order by total desc "
    );

    return res.json(rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const salesPerMonth = async (req, res) => {
  try {
    const { rows } = await knex.raw(
      "SELECT  EXTRACT(MONTH FROM vendas.data) as month, SUM(carros.valor) as total from vendas JOIN carros ON carros.id = vendas.carro_id group by month"
    );

    return res.json(rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const averageCarValues = async (req, res) => {
  try {
    const { rows } = await knex.raw(
      "SELECT AVG(carros.valor), EXTRACT(MONTH FROM vendas.data) as month FROM vendas JOIN carros ON carros.id = vendas.carro_id GROUP BY month"
    );

    return res.json(rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  rankSellers,
  salesPerMonth,
  averageCarValues,
};
