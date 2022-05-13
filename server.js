const express = require("express");
const formidable = require("express-formidable");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
app.use(formidable());
app.use(morgan("dev"));
app.use(cors());
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);

const userRoutes = require("./routes/users");
app.use(userRoutes);
const comicRoutes = require("./routes/comics");
app.use(comicRoutes);
const characterRoutes = require("./routes/characters");
app.use(characterRoutes);
const favoritesRoutes = require("./routes/favorites");
app.use(favoritesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello to Marvel API !" });
});

app.listen(process.env.PORT, () => {
  console.log("*** ========= Server has started ========= ***");
});

app.all("*", (req, res) => {
  res.status(404).json("Page not found !");
});
