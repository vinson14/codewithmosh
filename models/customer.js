const mongoose = require("mongoose");
const config = require("config");

// Define Customer Schema and create Model
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: config.get("validation.customer.name.minLength"),
        maxLength: config.get("validation.customer.name.maxLength"),
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        minLength: config.get("validation.customer.phone.minLength"),
        maxLength: config.get("validation.customer.phone.maxLength"),
    },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports.Customer = Customer;
