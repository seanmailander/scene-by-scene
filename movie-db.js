const getDetails = async (id) => {
  //TODO: read from file by id: "tt0001038"
  const movieDetails = {
    id,
    title: "A very good movie",
  };
  return movieDetails;
};

const findLinks = async (knownIds, newId) => {
  // Dont start unless we have at least two
  if (knownIds.length < 2) {
    return [];
  }
  // Get set of movie IDs that link to the newId

  const foundLinks = [1, 2];

  return foundLinks;
};

const randomPair = async () => {
  // TODO: get pair from file
  const randomPair = ["tt0000630", "tt0001038"];

  return randomPair;
};

module.exports = {
  getDetails,
  findLinks,
  randomPair,
};
