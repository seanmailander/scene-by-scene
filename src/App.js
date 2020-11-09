import { useState } from "react";
import "./App.css";

import TargetMovies from "./target-movies";
import LinkedMovies from "./linked-movies";

function App() {
  // The past
  const [targetMovies, setTargetMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const addToMovieList = (event) => {
    event.preventDefault();
    const textInput = event.target["movie-title"];
    const newMovie = textInput.value;
    if (targetMovies.length < 2) {
      setTargetMovies([...targetMovies, newMovie]);
      event.target.reset();
      return;
    }

    setMovieList([...movieList, newMovie]);
    event.target.reset();
  };

  return (
    <div className="App">
      <header className="App-header">
          Scene by Scene
          <br />
          <small>Find the link between two movies</small>
      </header>
      <TargetMovies targetMovies={targetMovies} />

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
