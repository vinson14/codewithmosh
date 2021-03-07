// Packages import
const express = require("express");

// Local imports
const genreRouter = require("./routes/genre");

var app = express();

// Middlewares setup
app.use(express.json());

// Routers setup
app.use("/genres/api", genreRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port 3000..."));
