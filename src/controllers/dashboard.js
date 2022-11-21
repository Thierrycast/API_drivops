const knex = require("../database/connection");

const rankSellers = async (req, res) => {
  try {
    const { rows } = await knex.raw(
      "SELECT vendedores.id, vendedores.nome, sum(carros.valor) as total FROM vendas RIGHT JOIN vendedores ON vendedores.id = vendas.vendedor_id left JOIN carros ON carros.id = vendas.carro_id group by vendedores.id order by total desc LIMIT 5"
    );

    return res.json(rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const salesPerMonth = async (req, res) => {
  try {
    const { rows } = await knex.raw(
      "SELECT  EXTRACT(MONTH FROM vendas.data) as index, SUM(carros.valor) as total from vendas JOIN carros ON carros.id = vendas.carro_id group by index order by index asc "
    );

    const months = [
      "jan.",
      "fev.",
      "mar.",
      "abr.",
      "maio.",
      "jun.",
      "jul.",
      "ago.",
      "set.",
      "out.",
      "nov.",
      "dez.",
    ];

    const data = rows.map((row) => {
      const response = {
        ...row,
        month: months[row.index - 1],
      };
      return response;
    });

    return res.json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const averageCarValues = async (req, res) => {
  try {
    const { rows } = await knex.raw(
      "SELECT AVG(carros.valor), EXTRACT(MONTH FROM vendas.data) as index FROM vendas JOIN carros ON carros.id = vendas.carro_id GROUP BY index order by index asc "
    );

    const months = [
      "jan.",
      "fev.",
      "mar.",
      "abr.",
      "maio.",
      "jun.",
      "jul.",
      "ago.",
      "set.",
      "out.",
      "nov.",
      "dez.",
    ];

    const data = rows.map((row) => {
      const response = {
        ...row,
        month: months[row.index - 1],
      };
      return response;
    });

    return res.json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  rankSellers,
  salesPerMonth,
  averageCarValues,
};
