const mongoose = require("mongoose");
const config = require("config");

const { Movie } = require("../models/movie");

const createMovie = async (movie) => {
    const newMovie = new Movie(movie);
    try {
        return await newMovie.save();
    } catch (error) {
        console.error(error);
        return error.message;
    }
};

const getAll = async () => {
    return await Movie.find().sort({ name: 1 });
};

const getMovieById = async (id) => {
    try {
        return await Movie.findById(id);
    } catch (error) {
        return error.reason.message;
    }
};

const updateMovieById = async (id, updatedMovie) => {
    try {
        return await Movie.findByIdAndUpdate(id, updatedMovie, { new: true });
    } catch (error) {
        return error.reason.message;
    }
};

const deleteMovieById = async (id) => {
    try {
        return await Movie.findByIdAndDelete(id);
    } catch (error) {
        return error.reason.message;
    }
};

module.exports.createMovie = createMovie;
module.exports.getAll = getAll;
module.exports.getMovieById = getMovieById;
module.exports.updateMovieById = updateMovieById;
module.exports.deleteMovieById = deleteMovieById;
