import { useNavigate } from "react-router";
import { TMDB_IMAGE_BASE_URL } from "../constants/urls";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      className="group relative cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:z-10"
      onClick={() => navigate(`/details/${movie.id}`)}
    >
      {/* 포스터 이미지 */}
      <img
        src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover rounded-md shadow-md group-hover:shadow-2xl"
      />

      {/* 영화 정보 */}
      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-bold text-gray-200 group-hover:text-white truncate">{movie.title}</h3>

        <div className="flex items-center text-xs font-semibold text-yellow-500">
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
