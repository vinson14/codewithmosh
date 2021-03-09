const mongoose = require("mongoose");
const config = require("config");
const { Customer } = require("../models/customer");

//Get all documents from customer table
const getAll = async () => {
    return await Customer.find().sort({ name: 1 });
};
// Create new customer
const createCustomer = async (customer) => {
    const newCustomer = new Customer(customer);
    try {
        return await newCustomer.save();
    } catch (error) {
        return error.message;
    }
};
// Retreive a single customer by ID
const getCustomerById = async (id) => {
    try {
        return await Customer.findById(id);
    } catch (error) {
        return error.reason.message;
    }
};
// Update customer by ID
const updateCustomerById = async (id, updatedCustomer) => {
    try {
        return await Customer.findByIdAndUpdate(id, updatedCustomer, {
            new: true,
        });
    } catch (error) {
        return error.reason.message;
    }
};

// Delete a single customer by ID
const deleteCustomerById = async (id) => {
    try {
        return await Customer.findByIdAndDelete(id);
    } catch (error) {
        return error.reason.message;
    }
};

module.exports.getAll = getAll;
module.exports.createCustomer = createCustomer;
module.exports.getCustomerById = getCustomerById;
module.exports.updateCustomerById = updateCustomerById;
module.exports.deleteCustomerById = deleteCustomerById;
