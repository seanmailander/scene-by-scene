import { useState } from "react";
import "./App.css";

import TargetMovies from "./target-movies";
import LinkedMovies from "./linked-movies";

function App() {
  // The past
  const [targetMovies, setTargetMovies] = useState([null, null]);
  const [movieList, setMovieList] = useState([]);

  const addToMovieList = (event) => {
    // Get useful stuff from DOM
    event.preventDefault();
    const textInput = event.target["movie-title"];
    const newMovie = textInput.value;
    const clearInput = () => event.target.reset();

    // Okay, so what do we do with it?

    // If we dont yet have two titles, add this to one of the targets
    // TODO: make the targets "pickable" rather than free-text
    if (targetMovies.filter((m) => !!m).length < 2) {
      const appendedToNonNull = [...targetMovies.filter((m) => !!m), newMovie];
      const alwaysLengthOfTWo =
        appendedToNonNull.length < 2
          ? [...appendedToNonNull, null]
          : appendedToNonNull;
      setTargetMovies(alwaysLengthOfTWo);
      clearInput();
      return;
    }

    setMovieList([...movieList, newMovie]);
    clearInput();
  };

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
          <input id="movie-title" type="text"></input>
        </form>
      </footer>
    </div>
  );
}

export default App;
