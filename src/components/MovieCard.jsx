import { useNavigate } from "react-router-dom";
import { TMDB_IMAGE_BASE_URL } from "../constants/urls";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/details/${movie.id}`)}>
      <img src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
    </div>
  );
}

export default MovieCard;
