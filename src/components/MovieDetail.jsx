const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetail({ movie }) {
  if (!movie) return <p>영화를 선택해주세요.</p>;

  return (
    <div className="movie-detail">
      <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>장르: {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}</p>
      <p>⭐ {movie.vote_average}</p>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetail;
