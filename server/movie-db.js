const fetch = require("node-fetch");
require("dotenv").config();

// Connection URL
const tmdbBaseURL = "https://api.themoviedb.org/3";

let tmdbClient = undefined;

const randomInArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getTMDBClient = async () => {
  if (tmdbClient) {
    return tmdbClient;
  }

  const authToken = process.env.TMDB_AUTH_TOKEN;

  const config = async () => {
    const response = await fetch(`${tmdbBaseURL}/configuration`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const { images } = await response.json();

    return images;
  };

  const imageConfig = await config();
  const buildImageURI = (path) => {
    const { secure_base_url, poster_sizes } = imageConfig;
    return [secure_base_url, poster_sizes[1], path].join("");
  };

  const search = async (query) => {
    const response = await fetch(
      `${tmdbBaseURL}/search/movie?query=${encodeURIComponent(query)}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    const { results } = await response.json();

    return results[0].id;
  };

  const castAndCrew = async (id) => {
    const response = await fetch(`${tmdbBaseURL}/movie/${id}/credits`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const { cast, crew } = await response.json();
    const directors = crew.filter(({ job }) => job === "Director");
    const principals = [
      ...cast.map(({ id }) => id),
      ...directors.map(({ id }) => id),
    ];

    return principals;
  };
  const findByIMDB = async (id) => {
    const response = await fetch(
      `${tmdbBaseURL}/find/${id}?external_source=imdb_id`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    const { movie_results } = await response.json();
    const foundId = movie_results.map(({ id }) => id).find(() => true);

    return foundId;
  };

  const random = async () => {
    const response = await fetch(`${tmdbBaseURL}/trending/movie/day`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const { results } = await response.json();
    const { id } = randomInArray(results);

    return id;
  };

  const details = async (id) => {
    const response = await fetch(`${tmdbBaseURL}/movie/${id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const { title, poster_path } = await response.json();
    const thumbnail = buildImageURI(poster_path);

    return {
      title,
      thumbnail,
    };
  };

  return (tmdbClient = {
    castAndCrew,
    details,
    findByIMDB,
    random,
    search,
  });
};

const getDetails = async (tt) => {
  const { details } = await getTMDBClient();
  const response = await details(tt);

  const movieDetails = {
    title: response.title,
    thumbnail: response.thumbnail,
  };
  return movieDetails;
};

const searchMoviesByTitle = async (query) => {
  const { search } = await getTMDBClient();
  const foundId = await search(query);

  return foundId;
};

const lookupPrincipalsByTitle = async (tt) => {
  // Get all principles for this title
  const { castAndCrew } = await getTMDBClient();
  const principalsByTitle = await castAndCrew(tt);

  return new Set(principalsByTitle);
};

const findLinks = async (knownIds, newId) => {
  // Dont start unless we have at least two
  if (knownIds.length < 2) {
    return [];
  }
  // Get set of movie IDs that link to the newId
  // find principals for newId
  const newPrincipals = await lookupPrincipalsByTitle(newId);

  // Find principals for knownIds
  const principalsByTitle = await Promise.all(
    knownIds.map(async (tt) => {
      const nms = await lookupPrincipalsByTitle(tt);
      return {
        tt,
        nms,
      };
    })
  );

  // Find any matches
  const matchedKnownIds = principalsByTitle
    .filter(
      ({ nms }) => [...nms].filter((nm) => newPrincipals.has(nm)).length > 0
    )
    .map(({ tt }) => tt);

  return matchedKnownIds;
};

const randomPair = async () => {
  const { random } = await getTMDBClient();
  const randomPair = await Promise.all([random(), random()]);

  return randomPair;
};

// NOOP
const closeInstance = async () => {};

module.exports = {
  getDetails,
  searchMoviesByTitle,
  findLinks,
  randomPair,
  closeInstance,
  getTMDBClient,
};
