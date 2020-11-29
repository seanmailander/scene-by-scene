import React from "react";

export default function MovieCard(props) {
  const { movie = {} } = props;
  const { id, title, thumbnail } = movie;

  const nullMovie = (
    <div>
      <image></image>
      Select a movie
    </div>
  );

  return !id ? (
    nullMovie
  ) : (
    <div className="movie">
      <img src={thumbnail} alt={title} title={`${id}:${title}`}></img>
      {/* {links.length > 0 && <p>Links: {links}</p>} */}
    </div>
  );
}
