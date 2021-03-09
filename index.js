// Packages import
const express = require("express");

// Router imports
const genreRouter = require("./routes/genre");
const customerRouter = require("./routes/customer");
const movieRouter = require("./routes/movie");
const rentalRouter = require("./routes/rental");

// Local imports
const genreDB = require("./utils/genreDB");
genreDB.connect();

var app = express();

// Middlewares setup
app.use(express.json());

// Routers setup
app.use("/genres/api", genreRouter);
app.use("/customers/api", customerRouter);
app.use("/movies/api", movieRouter);
app.use("/rentals/api", rentalRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port 3000..."));
