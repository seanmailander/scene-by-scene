export const getDetails = async (movieId) => {
  try {
    const response = await fetch(`/details?id=${movieId}`);

    const details = await response.json();

    return details;
  } catch (e) {
    console.debug(e);
    return [];
  }
};

export const search = async (search) => {
  try {
    const response = await fetch(`/search?search=${search}`);

    const foundTitles = await response.json();

    return foundTitles;
  } catch (e) {
    console.debug(e);
    return null;
  }
};

export const findLinks = async (movieList, newId) => {
  try {
    const response = await fetch("/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        knownIds: movieList.map(({ id }) => id),
        newId,
      }),
    });

    const foundLinks = await response.json();

    return foundLinks;
  } catch (e) {
    console.debug(e);
    return [];
  }
};

export const randomPair = async () => {
  try {
    const response = await fetch("/randomPair", {
      method: "POST",
    });

    return await response.json();
  } catch (e) {
    console.debug(e);
    return [];
  }
};
