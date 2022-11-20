require("dotenv").config();

const express = require("express");
const route = require("./routes");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(route);

app.listen(process.env.PORT || 3000);
