export default function LinkedMovies(props) {
  const { targetMovies = [], movieList = [] } = props;

  return targetMovies.length === 2 ? (
    <section>
      Linked movies
      <div className="movie-list">
        {movieList.map((movie) => (
          <p>{movie}</p>
        ))}
      </div>
    </section>
  ) : null;
}
