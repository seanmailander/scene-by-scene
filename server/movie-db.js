const util = require("util");
const redis = require("redis");
const client = redis.createClient();

const setMembers = util.promisify(client.smembers).bind(client);

const getDetails = async (id) => {
  //TODO: read from file by id: "tt0001038"
  const movieDetails = {
    id,
    title: "A very good movie",
  };
  return movieDetails;
};

const lookupPrincipalsByTitle = async (tt) => {
  // Get all principles for this title
  const principals = await setMembers(`principals-by-title.${tt}`);

  return new Set(principals);
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
    .filter(({ nms }) => [...nms].filter((nm) => newPrincipals.has(nm)).length > 0)
    .map(({ tt }) => tt);

  return matchedKnownIds;
};

const randomPair = async () => {
  // TODO: get pair from file
  const randomPair = ["tt0000630", "tt0001038"];

  return randomPair;
};

const closeInstance = () => {
    client.quit();
}

module.exports = {
  getDetails,
  findLinks,
  randomPair,
  closeInstance
};
