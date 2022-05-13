const express = require("express");
const router = express.Router();
const IsAuthenticated = require("../middlewares/IsAuthenticated");
const axios = require("axios");
const Favorite = require("../models/Favorite");

router.get("/favorites", async (req, res) => {
  try {
    const favorites = await Favorite.find({
      token: req.fields.token,
    });

    res.json(favorites.data);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/favorites/save", IsAuthenticated, async (req, res) => {
  const id = req.fields.id;
  const category = req.fields.category;
  // if (isFavoriteExist(id, category, req.user) === false) {
  try {
    const newFavorite = new Favorite({
      id: id,
      category: category,
      user: req.user,
    });
    await newFavorite.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
  // }
});

router.post("/favorites/remove", IsAuthenticated, async (req, res) => {
  const { id, category } = req.fields;

  try {
    const removeFavorite = await Favorite.findOneAndDelete({
      id: id,
      category: category,
      user: req.user,
    });

    if (removeFavorite) {
      res.status(200).json({ success: true });
    } else {
      res.json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});

let isFavoriteExist = async (id, category, user) => {
  try {
    const isFavoriteExisting = await Favorite.findOne({
      id: id,
      category: category,
      user: user,
    });

    if (isFavoriteExisting) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = router;
