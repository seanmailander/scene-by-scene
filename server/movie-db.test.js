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
  test("Finds links for no matching targets", async () => {
    // Arrange
    const knownIds = ["tt0047162", "tt0199369"];
    const newId = "tt0071443";

    // Act
    const foundLinks = await movieDb.findLinks(knownIds, newId);

    // Assert
    expect(foundLinks).toEqual([]);
  });
});

afterAll(() => movieDb.closeInstance());
