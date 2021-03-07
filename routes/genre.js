var express = require("express");
const { restArgs } = require("underscore");
var router = express.Router();

// Local imports
const genreDB = require("../utils/genreDB");
const validation = require("../utils/validation");

// Get request for all genres
router.get("/", (req, res) => {
    res.send(genreDB.getAll());
});

// Post request to create new genre
router.post("/", (req, res) => {
    // Validate request data
    const { error, value } = validation.validateAddGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    res.send(genreDB.addGenre(req.body.name));
});

// Retrieve a single genre by ID
router.get("/:id", (req, res) => {
    // Parse ID from req
    const id = parseInt(req.params.id);

    // Find genre object from DB
    const genre = genreDB.getOne(id);

    // Handle if no genre found
    if (!genre)
        return res.status(404).send("The requested genre was not found");

    // Return to user
    res.send(genre);
});

// Delete one genre by ID
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const genre = genreDB.deleteOne(id);
    // Handle if no genre found
    if (!genre)
        return res.status(404).send("The requested genre was not found");

    // Return to user
    res.send(genre);
});

// Update one genre by ID
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const { error } = validation.validateAddGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = genreDB.updateOne(id, req.body.name);

    if (!genre)
        return res.status(404).send("The request genre ID was not found");

    res.send(genre);
});

module.exports = router;
