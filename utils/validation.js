const Joi = require("joi");
const config = require("config");

const validateCreateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(config.get("validation.genre.name.minLength"))
            .max(config.get("validation.genre.name.maxLength"))
            .required(),
    });

    return schema.validate(genre);
};

const validateCreateCustomer = (customer) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(config.get("validation.customer.name.minLength"))
            .max(config.get("validation.customer.name.maxLength"))
            .required(),
        isGold: Joi.boolean(),
        phone: Joi.string()
            .min(config.get("validation.customer.phone.minLength"))
            .max(config.get("validation.customer.phone.maxLength")),
    });

    return schema.validate(customer);
};

module.exports.validateCreateGenre = validateCreateGenre;
module.exports.validateCreateCustomer = validateCreateCustomer;
