const movieDb = require("./movie-db");

describe("Finding links between movies", () => {
  test("Finds links for all matching targets", async () => {
    // Arrange
    const knownIds = ["tt0047162", "tt0062225"];
    const newId = "tt0071442";

    // Act
    const foundLinks = await movieDb.findLinks(knownIds, newId);

    // Assert
    expect(foundLinks).toEqual(["tt0047162", "tt0062225"]);
  });
  test("Finds links for single matching target", async () => {
    // Arrange
    const knownIds = ["tt0047162", "tt0199369"];
    const newId = "tt0071442";

    // Act
    const foundLinks = await movieDb.findLinks(knownIds, newId);

    // Assert
    expect(foundLinks).toEqual(["tt0047162"]);
  });
  test("Finds links in known list", async () => {
    // Arrange
    const knownIds = ["tt0000630", "tt0078915"];
    const newId = "tt0078915";

    // Act
    const foundLinks = await movieDb.findLinks(knownIds, newId);

    // Assert
    expect(foundLinks).toEqual(["tt0078915"]);
  });
  test("Finds links for no matching targets", async () => {
    // Arrange
    const knownIds = ["tt0047162", "tt0199369"];
    const newId = "tt0071443";

    // Act
    const foundLinks = await movieDb.findLinks(knownIds, newId);

    // Assert
    expect(foundLinks).toEqual([]);
  });
  test("Finds no links when no principals", async () => {
    // Arrange
    const knownIds = ["tt0001038"];
    const newId = "tt0001038";

    // Act
    const foundLinks = await movieDb.findLinks(knownIds, newId);

    // Assert
    expect(foundLinks).toEqual([]);
  });
});


describe("Finding random titles", () => {
    test("Finds two random titles", async () => {
      // Arrange
  
      // Act
      const randomPair = await movieDb.randomPair();
  
      // Assert
      expect(randomPair).toHaveLength(2);
    });
    test("Finds two distinct random titles", async () => {
      // Arrange
  
      // Act
      const randomPair = await movieDb.randomPair();
  
      // Assert
      expect(randomPair).toHaveLength(2);
      expect(randomPair[0]).not.toEqual(randomPair[1]);
    });
    test.skip("Finds two distinct random titles that have at least one link", async () => {
      // Arrange
  
      // Act
      const randomPair = await movieDb.randomPair();
  
      // Assert
      expect(randomPair).toHaveLength(2);
    });
});
afterAll(() => movieDb.closeInstance());
