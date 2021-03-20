const winston = require("winston");

const errorHandler = (err, req, res, next) => {
    console.log(Object.keys(err));
    return res.status(500).send("Something went wrong");
};

module.exports = errorHandler;
