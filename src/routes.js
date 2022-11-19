const express = require("express");
const route = express();

const login = require("./controllers/login");
const authorization = require("./middleware/authorization");
const { registerUser, detailUser } = require("./controllers/users");
const { registerCar } = require("./controllers/cars");

route.post("/users", registerUser);

route.post("/login", login);

route.use(authorization);

route.get("/user", detailUser);

route.post("/cars", registerCar);

module.exports = route;
