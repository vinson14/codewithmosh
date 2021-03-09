const mongoose = require("mongoose");
const { Rental } = require("../models/rental");

const getAll = async () => {
    return await Rental.find().sort({ dateOut: -1 });
};

const createRental = async (rental) => {
    const newRental = new Rental(rental);
    try {
        return await newRental.save();
    } catch (error) {
        return error.message;
    }
};

module.exports.getAll = getAll;
module.exports.createRental = createRental;
