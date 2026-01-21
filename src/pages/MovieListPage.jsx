import { useState, useEffect } from "react";
import MovieCarousel from "../components/MovieCarousel";
import { TMDB_API_BASE_URL } from "../constants/urls";
import SkeletonCard from "../components/SkeletonCard";

function MovieListPage() {
  /* 상태 관리 : 영화 목록 및 로딩 상태 */
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
          /*성인 영화 제외*/
          const filtered = data.results.filter((movie) => movie.adult === false);
          setMovies(filtered);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    };

    getMovies();
  }, []);

  return (
    /* 페이지 레아이웃 */
    <div className="px-4 py-8 md:px-10 min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 uppercase">인기 영화</h1>

      {/* 조건부 렌더링 : 로딩은 스켈레톤, 완료는 캐러셀 */}
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
