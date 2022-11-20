const express = require("express");
const route = express();

const login = require("./controllers/login");
const authorization = require("./middleware/authorization");
const { registerUser, detailUser } = require("./controllers/users");
const { registerCar, ListCars, detailCar } = require("./controllers/cars");
const { registerSale, ListSales, detailSale } = require("./controllers/sales");

const {
  registerSeller,
  ListSellers,
  detailSeller,
} = require("./controllers/sellers");

route.post("/users", registerUser);

route.post("/login", login);

route.use(authorization);

route.get("/user", detailUser);

route.post("/cars", registerCar);
route.get("/cars", ListCars);
route.get("/cars/:id", detailCar);

route.post("/sellers", registerSeller);
route.get("/sellers", ListSellers);
route.get("/sellers/:id", detailSeller);

route.post("/sales", registerSale);
route.get("/sales", ListSales);
route.get("/sales/:id", detailSale);

module.exports = route;
