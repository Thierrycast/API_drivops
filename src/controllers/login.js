const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const schemaLogin = require("../validation/schemaLogin");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await schemaLogin.validate(req.body);

    const user = await knex("usuarios").where({ email }).first();
    if (!user) {
      return res.status(400).json("Este e-mail não existe");
    }

    const checkPassword = await bcrypt.compare(senha, user.senha);
    if (!checkPassword) {
      return res.status(400).json("A senha está incorreta");
    }

    const token = jwt.sign(
      { id: user.id, nome: user.nome },
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );

    return res.status(200).json({
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = login;
