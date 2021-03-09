const mongoose = require("mongoose");
const config = require("config");

// Define Genre Schema and create Model
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: config.get("validation.genre.name.minLength"),
        maxLength: config.get("validation.genre.name.maxLength"),
    },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
