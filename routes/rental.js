const express = require("express");
const router = express.Router();

// Local imports
const rentalDB = require("../utils/rentalDB");
const movieDB = require("../utils/movieDB");
const customerDB = require("../utils/customerDB");
const validation = require("../utils/validation");
const { Rental } = require("../models/rental");

// Post request to create new rental
router.post("/", async (req, res) => {
    const { error } = validation.validateCreateRental(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const customer = await customerDB.getCustomerById(req.body.customer);
    if (!customer) return res.status(404).send("Customer ID not found");

    const movie = await movieDB.getMovieById(req.body.movie);
    if (!movie) return res.status(404).send("Movie ID not found");

    const newRental = await rentalDB.createRental(req.body);

    const updatedMovie = await movieDB.updateMovieById(req.body.movie, {
        $inc: { numberInStock: -1 },
    });

    if (updatedMovie) {
        return res.send(newRental);
    }
});

// Get request to retrieve all rentals
router.get("/", async (req, res) => {
    return res.send(await rentalDB.getAll());
});

module.exports = router;
