const express = require("express");
const router = express.Router();
const IsAuthenticated = require("../middlewares/IsAuthenticated");
const axios = require("axios");

// get all the characters
router.get("/characters", async (req, res) => {
  try {
    let title = req.query.search ? req.query.search : "";
    title = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let page = req.query.page;
    let limit = req.query.limit;
    let skip = (page - 1) * limit;

    const comics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${title}&skip=${skip}&limit=${limit}&apiKey=${process.env.MARVEL_API_KEY}`
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
