export default function LinkedMovies(props) {
  const { targetMovies = [], movieList = [] } = props;

  return targetMovies.filter(m => !!m).length === 2 ? (
    <section>
      { movieList.length > 0 ? "Linked movies" : null }
      <div className="movie-list">
        {movieList.map((movie) => (
          <p>{movie}</p>
        ))}
      </div>
    </section>
  ) : null;
}
