import { useState } from "react";
import "./App.css";

import TargetMovies from "./target-movies";
import LinkedMovies from "./linked-movies";

import { getDetails, findLinks, search } from "./services";

function App() {
  // The past
  const [targetMovies, setTargetMovies] = useState([undefined, undefined]);
  const [movieList, setMovieList] = useState([]);
  const [warning, setWarning] = useState(null);

  const hasSelectedTwoMovies = targetMovies.filter((m) => !!m).length === 2;

  const addToMovieList = async (event) => {
    // Get useful stuff from DOM
    event.preventDefault();
    const textInput = event.target["movie-title"];
    const movieTitle = textInput.value;
    const clearInput = () => event.target.reset();

    // Okay, so what do we do with it?

    // Do we have a matching title?
    const movieId = await search(movieTitle);
    if (!movieId) {
      // Otherwise show a hint or failure
      setWarning("Title not found");
      return;
    }

    // If we dont yet have two titles, add this to one of the targets
    // TODO: make the targets "pickable" rather than free-text
    if (!hasSelectedTwoMovies) {
      // Get some more details
      const { title, thumbnail } = await getDetails(movieId);

      // Now add to the list of linked movies
      const newMovie = {
        id: movieId,
        title,
        thumbnail,
        links: [],
      };

      const appendedToNonNull = [...targetMovies.filter((m) => !!m), newMovie];
      const alwaysLengthOfTWo =
        appendedToNonNull.length < 2
          ? [...appendedToNonNull, undefined]
          : appendedToNonNull;
      setTargetMovies(alwaysLengthOfTWo);
      clearInput();
      return;
    }

    // Is this a valid link between any found titles?
    const foundLinks = await findLinks(
      [...targetMovies, ...movieList],
      movieId
    );
    const isValidLink = foundLinks.length > 0;

    if (!isValidLink) {
      setWarning("Not linked to any current movies");
      return;
    }

    // Get some more details
    const { title, thumbnail } = await getDetails(movieId);
    // Now add to the list of linked movies
    const newMovie = {
      id: movieId,
      title,
      thumbnail,
      links: foundLinks,
    };
    setMovieList([...movieList, newMovie]);
    clearInput();
  };

  const helperText = hasSelectedTwoMovies
    ? `Find the cast who link ${targetMovies[0].id} and ${targetMovies[1].id}`
    : "Find the link between two movies";

  const clearWarning = !!warning ? (
    <button onClick={() => setWarning()}>x</button>
  ) : null;

  return (
    <div className="App">
      <header className="App-header">
        Scene by Scene
        <br />
        <small>{helperText}</small>
      </header>
      <section className="main">
        <TargetMovies
          targetMovies={targetMovies}
          setTargetMovies={setTargetMovies}
        />

        <LinkedMovies targetMovies={targetMovies} movieList={movieList} />
      </section>

      <footer>
        <form onSubmit={addToMovieList}>
          <p>Enter a movie title</p>
          <p>
            <small>
              {warning} {clearWarning}
            </small>
          </p>
          <input id="movie-title" type="text"></input>
        </form>
      </footer>
    </div>
  );
}

export default App;
