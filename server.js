const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));
}

app.use(bodyParser.json());

app.get("/details", (req, res) => {
  const { id } = req.query;

  console.debug(req.query);

  if (!id) {
    res.json({
      error: "Missing required parameter `id`",
    });
    return;
  }

  // Get movie details
  const movieDetails = {
    id,
    title: "A very good movie",
  };

  res.json(movieDetails);
});

app.post("/links", (req, res) => {
  const { movieList, newMovie } = req.body;

  console.debug(req.body);

  if (!movieList || !newMovie) {
    res.json({
      error: "Missing required parameters `movieList` and `newMovie`",
    });
    return;
  }
  // Get set of movie IDs that
  const foundLinks = [1, 2];

  res.json(foundLinks);
});

app.post("/randomPair", (req, res) => {
  // Get random pair of movie IDs
  const randomPair = [13, 45];

  res.json(randomPair);
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
