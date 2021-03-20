const express = require("express");
const router = express.Router();

// Local imports
const genreDB = require("../utils/genreDB");
const validation = require("../utils/validation");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Get request for all genres
router.get("/", async (req, res) => {
    return res.send(await genreDB.getAll());
});

// Post request to create new genre
router.post("/", [auth, admin], async (req, res) => {
    // Validate request data passed by user
    const { error } = validation.validateCreateGenre(req.body);
    // If data invalid, return error message to user
    if (error) return res.status(400).send(error.details[0].message);

    res.send(await genreDB.createGenre(req.body));
});

// Retrieve a single genre by ID
router.get("/:id", async (req, res) => {
    // Find genre object from DB
    const genre = await genreDB.getGenreById(req.params.id);

    // Handle if no genre found
    if (!genre)
        return res.status(404).send("The requested genre was not found");

    // Return to user
    return res.send(genre);
});

// Delete one genre by ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const genre = await genreDB.deleteGenreById(id);
    // Handle if no genre found
    if (!genre)
        return res.status(404).send("The requested genre was not found");

    // Return to user
    res.send(genre);
});

// Update one genre by ID
router.put("/:id", async (req, res) => {
    // Validate data posted by user
    const { error } = validation.validateCreateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await genreDB.updateGenreById(req.params.id, req.body);

    if (!genre)
        return res.status(404).send("The request genre ID was not found");
    return res.send(genre);
});

module.exports = router;
