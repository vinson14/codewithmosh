// Packages import
const express = require("express");
const config = require("config");

// Router imports
const genreRouter = require("./routes/genre");
const customerRouter = require("./routes/customer");
const movieRouter = require("./routes/movie");
const rentalRouter = require("./routes/rental");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

// Local imports
const genreDB = require("./utils/genreDB");
const errorHandler = require("./middleware/errorHandler");
genreDB.connect();

// Check if env variables are properly set
if (!config.get("jwtPrivateKey")) {
    console.error("jwtPrivateKey is not defined");
    process.exit(1);
}

var app = express();

// Middlewares setup
app.use(express.json());

// Routers setup
app.use("/genres/api", genreRouter);
app.use("/customers/api", customerRouter);
app.use("/movies/api", movieRouter);
app.use("/rentals/api", rentalRouter);
app.use("/users/api", userRouter);
app.use("/auth/api", authRouter);

// Error Handler
app.use(errorHandler);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
