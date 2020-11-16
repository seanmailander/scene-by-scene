import React, { useState, useEffect } from "react";

import { getDetails } from "./services";

async function getMovieDetails(id, setMovieDetails) {
  if (!id) {
    return;
  }
  setMovieDetails({});
  const result = await getDetails(id);

  setMovieDetails(result);
}

export default function MovieCard(props) {
  const { movie = {} } = props;
  const { id, links } = movie;

  const [movieDetails, setMovieDetails] = useState({});
  useEffect(() => {
    getMovieDetails(id, setMovieDetails);
  }, [id]);

  const { title } = movieDetails;

  const nullMovie = (
    <div>
      <image></image>
      No movie selected
    </div>
  );

  return !id ? (
    nullMovie
  ) : (
    <div className="movie">
      <p>
        {title}
      </p>
      <p><small>{id}</small></p>
      <p>{links.length > 0 && <small>Links: {links}</small>}</p>
    </div>
  );
}
