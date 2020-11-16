const movieDb = require("./movie-db");

describe("Finding links between movies", () => {
  test("Finds links for all matching targets", async () => {
    // Arrange
    const knownIds = [57575, 140249];
    const newId = 93510;

    // Act
    const foundLinks = await movieDb.findLinks(knownIds, newId);

    // Assert
    expect(foundLinks).toEqual([57575, 140249]);
  });
  test("Finds links for single matching target", async () => {
    // Arrange
    const knownIds = [57575, 169666];
    const newId = 93510;

    // Act
    const foundLinks = await movieDb.findLinks(knownIds, newId);

    // Assert
    expect(foundLinks).toEqual([57575]);
  });
  test("Finds links in known list", async () => {
    // Arrange
    const knownIds = [33823, 20007];
    const newId = 20007;

    // Act
    const foundLinks = await movieDb.findLinks(knownIds, newId);

    // Assert
    expect(foundLinks).toEqual([20007]);
  });
  test("Finds links for no matching targets", async () => {
    // Arrange
    const knownIds = [57575, 169666];
    const newId = 156702;

    // Act
    const foundLinks = await movieDb.findLinks(knownIds, newId);

    // Assert
    expect(foundLinks).toEqual([]);
  });
  test.skip("Finds no links when no principals", async () => {
    // Arrange
    const knownIds = [1039, 1040];
    const newId = 1038;

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
