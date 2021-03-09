const mongoose = require("mongoose");
const config = require("config");

const rentalSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now,
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0,
    },
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports.Rental = Rental;
