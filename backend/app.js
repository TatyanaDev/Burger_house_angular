const express = require("express");
const cors = require("cors");
const path = require("path");
const burgerRoutes = require("./routes/burgers");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api", burgerRoutes);

module.exports = app;
