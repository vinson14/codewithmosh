const mongoose = require("mongoose");
const config = require("config");
const { Genre } = require("../models/genre");

// Connect to DB
const connect = async () => {
    try {
        const res = await mongoose.connect(config.get("dbConfig.host"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (res) console.log("Connected to MongoDB...");
    } catch (err) {
        console.error(err);
    }
};

// Function to get all documents from Genre Table
const getAll = async () => {
    const genres = await Genre.find().sort({ name: 1 });
    return genres;
};

// Function to create a new document in Genre Table
const createGenre = async (genre) => {
    const newGenre = new Genre(genre);
    try {
        return await newGenre.save();
    } catch (error) {
        console.error(error);
        return error.message;
    }
};

// Function to Delete a document in Genre Table
const deleteGenreById = async (id) => {
    try {
        return await Genre.findByIdAndDelete(id);
    } catch (error) {
        return error.reason.message;
    }
};

// Function to GET Genre by ID
const getGenreById = async (id) => {
    try {
        return await Genre.findById(id);
    } catch (error) {
        return error.reason.message;
    }
};

// Function to Update Genre by ID
const updateGenreById = async (id, updatedGenre) => {
    try {
        return await Genre.findByIdAndUpdate(id, updatedGenre, { new: true });
    } catch (error) {
        return error.reason.message;
    }
};

module.exports.connect = connect;
module.exports.getAll = getAll;
module.exports.createGenre = createGenre;
module.exports.deleteGenreById = deleteGenreById;
module.exports.getGenreById = getGenreById;
module.exports.updateGenreById = updateGenreById;
