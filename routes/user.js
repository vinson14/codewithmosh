const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { User, validateCreateUser } = require("../models/user");

// POST request to create new user
router.post("/", async (req, res) => {
    const { error } = validateCreateUser(req.body);

    // Check if user's body is valid
    if (error) return res.status(400).send(error.details[0].message);
    // Check if the email has already been registered
    if (await User.findOne({ email: req.body.email }))
        return res.status(400).send("User already exists");

    // Create user
    const newUser = new User(req.body);
    // Hash password
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    try {
        const response = await newUser.save();
        return res.send(_.pick(response, ["_id"]));
    } catch (error) {
        return res.send(error.message);
    }
});

module.exports = router;
