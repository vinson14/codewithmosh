const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
    // Get JWT Token from header
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied. No token provided");

    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
};

module.exports = auth;
