require("express-async-errors");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();
const { User, validateCreateUser } = require("../models/user");
const auth = require("../middleware/auth");
const { route } = require("./genre");

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
    newUser.password = await bcrypt.hash(newUser.password, salt);

    try {
        const response = await newUser.save();
        const token = newUser.getJWT();
        console.log("this ran");
        return res
            .header("x-auth-token", token)
            .send(_.pick(response, ["_id"]));
    } catch (error) {
        console.log("This ran");

        return res.send(error.message);
    }
});

router.get("/me", auth, async (req, res) => {
    const user = await await User.findById(req.user._id).select("-password");
    return res.send(user);
});

router.get("/testerror", async (req, res) => {
    console.log("this ran");
    const response = await getError();
});

const getError = async () => {
    throw new Error("broken");
};

module.exports = router;
