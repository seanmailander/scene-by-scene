export default function TargetMovies(props) {
  const { targetMovies, setTargetMovies } = props;

  const setTargetA = (newMovie) => setTargetMovies([newMovie, [targetMovies[1]]]);
  const setTargetB = (newMovie) => setTargetMovies([targetMovies[0], newMovie]);

    const nullMovie = (
        <div>
            <image></image>
            No movie selected
        </div>
    );

  return (
    <section>
      Target movies
      <div className="target-list">
        {targetMovies.map((movie) => (
          <p>
              {movie || nullMovie}
          <button onClick={() => setTargetMovies(["a", "b"])}>Set movie</button>
          </p>
        ))}
      </div>
    </section>
  );
}
