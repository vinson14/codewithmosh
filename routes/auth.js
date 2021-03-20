const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { User, validateCreateUser } = require("../models/user");
const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");

router.post("/", async (req, res) => {
    const { error } = validateAuthUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Validate username or email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res.status(400).send("Invalid email or password");

    return res.send(user.getJWT());
});

const validateAuthUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).email().required(),
        password: Joi.string().min(5).max(1024).required(),
    });

    return schema.validate(user);
};

module.exports = router;
