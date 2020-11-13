export default function MovieCard(props) {
    const { movie = {}} = props;
  const { id, title, links } = movie;

  const nullMovie = (
    <div>
      <image></image>
      No movie selected
    </div>
  );

  return !id ? nullMovie : (
    <div className="movie">
      <p>
        {id}: {title}
      </p>
      <p>
        { (links.length > 0 && <small>Links: {links}</small>) }
      </p>
    </div>
  );
}
