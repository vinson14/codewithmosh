const Joi = require("joi");

const validateAddGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(genre);
};

module.exports.validateAddGenre = validateAddGenre;
