const express = require("express");
const router = express.Router();

// Local imports
const movieDB = require("../utils/movieDB");

// Post request to create new movie
router.post("/", async (req, res) => {
    return res.send(await movieDB.createMovie(req.body));
});

// Get request to retrieve all movies
router.get("/", async (req, res) => {
    return res.send(await movieDB.getAll());
});

// Get request to retrieve movie by ID
router.get("/:id", async (req, res) => {
    const movie = await movieDB.getMovieById(req.params.id);

    // Handle if no movie found
    if (!movie)
        return res.status(404).send("The requested movie was not found");

    return res.send(movie);
});

// PUT request to update existing movie by ID
router.put("/:id", async (req, res) => {
    const movie = await movieDB.updateMovieById(req.params.id, req.body);

    if (!movie)
        return res.status(404).send("The requested movie was not found");

    return res.send(movie);
});

router.delete("/:id", async (req, res) => {
    const movie = await movieDB.deleteMovieById(req.params.id);

    if (!movie)
        return res.status(404).send("The requested movie was not found");

    return res.send(movie);
});

module.exports = router;
