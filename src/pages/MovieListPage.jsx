import { useState, useEffect } from "react";
import MovieCarousel from "../components/MovieCarousel";
import { TMDB_API_BASE_URL } from "../constants/urls";
import SkeletonCard from "../components/SkeletonCard";

function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /*영화 가져오기*/
    const getMovies = () => {
      setIsLoading(true);
      const url = `${TMDB_API_BASE_URL}/movie/popular?language=ko-KR&page=1`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          /*성인 영화*/
          const filtered = data.results.filter((movie) => movie.adult === false);
          setMovies(filtered);
          setIsLoading(false);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    };

    getMovies();
  }, []);

  return (
    <div className="px-4 py-8 md:px-10 min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 uppercase">인기 영화</h1>

      {isLoading ? (
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : (
        <div className="w-full">{movies.length > 0 && <MovieCarousel movies={movies} />}</div>
      )}
    </div>
  );
}

export default MovieListPage;
