import React, { useState, useEffect } from "react";

import MovieCard from "./movie-card";
import { randomPair } from "./services";

async function getRandomPair(setRandomMovies) {
  const result = await randomPair();

  setRandomMovies(
    result.map((movieId) => ({
      id: movieId,
      links: [],
    }))
  );
}

export default function TargetMovies(props) {
  const { targetMovies, setTargetMovies } = props;

  const [randomMovies, setRandomMovies] = useState(null);
  useEffect(() => {
    getRandomPair(setRandomMovies);
  }, [targetMovies]);

  const randomA = (newMovie = randomMovies[0]) =>
    setTargetMovies([newMovie, targetMovies[1]]);
  const randomB = (newMovie = randomMovies[1]) =>
    setTargetMovies([targetMovies[0], newMovie]);

  const randomHandlers = [randomA, randomB];

  return (
    <section>
      Target movies
      <div className="target-list">
        {targetMovies.map((movie, i) => (
          <p>
            <MovieCard movie={movie} />
            <button onClick={() => randomHandlers[i]()}>Random movie</button>
          </p>
        ))}
      </div>
    </section>
  );
}
