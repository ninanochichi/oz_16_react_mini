import { TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_BASE_URL } from "../constants/urls";

function MovieDetail({ movie }) {
  if (!movie) return <p>영화를 선택해주세요.</p>;

  return (
    <div className="movie-detail">
      <img src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>장르: {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}</p>
      <p>⭐ {movie.vote_average}</p>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetail;
