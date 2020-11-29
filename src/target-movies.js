import React, { useState, useEffect } from "react";

import MovieCard from "./movie-card";
import { getDetails, randomPair } from "./services";

async function getRandomPair(setRandomMovie) {
  const result = await randomPair();

  // Get some more details
  const { title, thumbnail } = await getDetails(result[0]);

  setRandomMovie({
    id: result[0],
    title,
    thumbnail,
    links: [],
  });
}

export default function TargetMovies(props) {
  const { targetMovies, setTargetMovies } = props;

  const [randomMovie, setRandomMovie] = useState(null);
  useEffect(() => {
    getRandomPair(setRandomMovie);
  }, [targetMovies]); // get a new random pair when either change

  const randomA = () => setTargetMovies([randomMovie, targetMovies[1]]);
  const randomB = () => setTargetMovies([targetMovies[0], randomMovie]);

  const randomHandlers = [randomA, randomB];

  return (
    <section>
      <div className="target-list">
        {targetMovies.map((movie, i) => (
          <p>
            <MovieCard movie={movie} />
            {!(!!movie && !!movie.id) ? <button onClick={() => randomHandlers[i]()}>Random movie</button> : null}
          </p>
        ))}
      </div>
    </section>
  );
}
