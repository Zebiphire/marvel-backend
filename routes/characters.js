const express = require("express");
const router = express.Router();
const IsAuthenticated = require("../middlewares/IsAuthenticated");
const axios = require("axios");
const Character = require("../models/Character");

// get all the characters
router.get("/characters", async (req, res) => {
  try {
    let title = req.query.search ? req.query.search : "";
    title = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const comics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${title}&apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(comics.data);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// get specific character
router.get("/character/:characterId", async (req, res) => {
  try {
    const comic = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(comic.data);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
