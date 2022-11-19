const express = require("express");
const route = express();

const { registerUser, detailUser } = require("./controllers/users");

route.post("/users", registerUser);
route.get("/user", detailUser);

module.exports = route;
