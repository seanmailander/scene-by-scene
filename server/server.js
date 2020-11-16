const express = require("express");
const bodyParser = require("body-parser");

const movieDb = require("./movie-db.js");
const { searchMoviesByTitle } = require("./movie-db.js");

const app = express();
app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));
}

app.use(bodyParser.json());

app.get("/details", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.json({
      error: "Missing required parameter `id`",
    });
    return;
  }

  // Get movie details
  const movieDetails = await movieDb.getDetails(id);

  res.json(movieDetails);
});

app.get("/search", async (req, res) => {
  const { search } = req.query;
  if (!search) {
    res.json({
      error: "Missing required parameter `search`",
    });
    return;
  }

  // Get movie details
  const movieDetails = await movieDb.searchMoviesByTitle(search);

  res.json(movieDetails);
});

app.post("/links", async (req, res) => {
  //{"knownIds":[13,45],"newId":1}
  const { knownIds, newId } = req.body;

  // Get set of movie IDs that link to the newId
  const foundLinks = await movieDb.findLinks(knownIds, newId);

  res.json(foundLinks);
});

app.post("/randomPair", async (req, res) => {
  // Get random pair of movie IDs
  const randomPair = await movieDb.randomPair();

  res.json(randomPair);
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
