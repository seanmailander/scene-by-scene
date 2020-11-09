export default function TargetMovies(props) {
  const { targetMovies = [] } = props;

  return (
    <section>
      Target movies
      <div className="target-list">
        {targetMovies.map((movie) => (
          <p>{movie}</p>
        ))}
      </div>
    </section>
  );
}
