import { useState } from "react";
import "./App.css";

import TargetMovies from "./target-movies";
import LinkedMovies from "./linked-movies";

import { findLinks } from "./services";

function App() {
  // The past
  const [targetMovies, setTargetMovies] = useState([undefined, undefined]);
  const [movieList, setMovieList] = useState([]);
  const [warning, setWarning] = useState(null);

  const addToMovieList = async (event) => {
    // Get useful stuff from DOM
    event.preventDefault();
    const textInput = event.target["movie-title"];
    const movieTitle = textInput.value;
    const clearInput = () => event.target.reset();

    // Okay, so what do we do with it?

    // TODO: validate its actually a valid movie title
    const movieId = movieTitle;
    const isValidMovieTitle = true;

    // Otherwise show a hint or failure
    if (!isValidMovieTitle) {
      setWarning("Title not found");
      return;
    }

    // If we dont yet have two titles, add this to one of the targets
    // TODO: make the targets "pickable" rather than free-text
    if (targetMovies.filter((m) => !!m).length < 2) {
      // Now add to the list of linked movies
      const newMovie = {
        id: movieId,
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
    const foundLinks = await findLinks([...targetMovies, ...movieList], movieId);
    const isValidLink = foundLinks.length > 0;

    if (!isValidLink) {
      setWarning("Not linked to any current movies");
      return;
    }

    // Now add to the list of linked movies
    const newMovie = {
      id: movieId,
      title: movieTitle,
      links: foundLinks,
    };
    setMovieList([...movieList, newMovie]);
    clearInput();
  };

  const clearWarning = !!warning ? (
    <button onClick={() => setWarning()}>x</button>
  ) : null;

  return (
    <div className="App">
      <header className="App-header">
        Scene by Scene
        <br />
        <small>Find the link between two movies</small>
      </header>
      <TargetMovies
        targetMovies={targetMovies}
        setTargetMovies={setTargetMovies}
      />

      <LinkedMovies targetMovies={targetMovies} movieList={movieList} />

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
