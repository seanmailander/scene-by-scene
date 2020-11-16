const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://root:example@localhost:27017";

// Database Name
const dbName = "admin";

let client = undefined;
const getMongoCollections = async () => {
  if (!client) {
    // Create a new MongoClient
    client = new MongoClient(url);
    await client.connect();
  }

  const db = client.db(dbName);
  const titlesCollection = db.collection("titles");
  const principalsCollection = db.collection("principals");
  const principalsByTitleCollection = db.collection("principalsbytitle");
  const titlesByPrincipal = db.collection("titlesbyprincipal");
  return {
    titlesCollection,
    principalsCollection,
    principalsByTitleCollection,
    titlesByPrincipal,
  };
};

const getDetails = async (tt) => {
  //TODO: read from file by id: "tt0001038"

  const { titlesCollection } = await getMongoCollections();
  const title = await titlesCollection
    .find({ title: tt })
    .limit(1)
    .toArray();

  const movieDetails = {
    id: tt,
    title: title[0].name,
  };
  return movieDetails;
};

const lookupPrincipalsByTitle = async (tt) => {
  // Get all principles for this title
  const { principalsByTitleCollection } = await getMongoCollections();
  const principalsByTitle = await principalsByTitleCollection
    .find({ title: tt })
    .limit(1)
    .toArray();

  const extractedPrinciples = principalsByTitle.map(
    ({ principals }) => principals
  );

  return new Set(extractedPrinciples[0]);
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
  // TODO: get pair from file
  const { titlesCollection } = await getMongoCollections();
  const randomPair = await titlesCollection.aggregate([{ $sample: { size: 2 } }]).toArray(); //["tt0000630", "tt0078915"];

  const titles = randomPair.map(({ title }) => title);
  return titles;
};

const closeInstance = async () => {
  await client.close();
};

module.exports = {
  getDetails,
  findLinks,
  randomPair,
  closeInstance,
};
