const express = require("express");
const moviesRouter = require("./routes/movies");
const usersRouter = require("./routes/users");
const app = express();

const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

app.use("/api/movies", moviesRouter);
app.use("/api/users", usersRouter);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
