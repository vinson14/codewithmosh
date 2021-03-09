const mongoose = require("mongoose");
const config = require("config");

// Local imports
const { genreSchema } = require("../models/genre");

// Define Movie Schema and create model
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minLength: config.get("validation.movie.title.minLength"),
        maxLength: config.get("validation.movie.title.maxLength"),
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        min: 0,
        default: 1,
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        default: 0,
    },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports.Movie = Movie;
