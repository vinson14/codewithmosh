const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");

// Define Users Schema and create Mode
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100,
        index: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 1024,
    },
});

const User = mongoose.model("User", userSchema);

const validateCreateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(100).email().required(),
        password: Joi.string().min(5).max(1024).required(),
    });

    return schema.validate(user);
};

module.exports.validateCreateUser = validateCreateUser;
module.exports.User = User;
