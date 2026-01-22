import { useState, useEffect, useCallback } from "react";
import MovieCarousel from "../components/MovieCarousel";
import { TMDB_API_BASE_URL } from "../constants/urls";
import SkeletonCard from "../components/SkeletonCard";

function MovieListPage() {
  /* 상태 관리 : 영화 목록 및 로딩 상태 */
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isThrottled, setIsThrottled] = useState(false);

  /* API 호출 : 인기 영화 목록 */
  const getMovies = useCallback(() => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);

    const url = `${TMDB_API_BASE_URL}/movie/popular?language=ko-KR&page=${page}`;
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
        const filtered = data.results.filter((movie) => movie.adult === false);
        /* 기존 영화 목록에 새 데이터 합침 */
        setMovies((prev) => (page === 1 ? filtered : [...prev, ...filtered]));
        /* 데이터 더 있는지 확인 */
        setHasMore(page < data.total_pages);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [page, hasMore]);

  /* 페이지 바뀔때마다 데이터 호출 */
  useEffect(() => {
    getMovies();
  }, [page]);

  /* 무한 스크롤 실행 */
  useEffect(() => {
    const handleScroll = () => {
      if (isThrottled) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      /* 바닥 지점 도착시 다음 페이지 증가 */
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setIsThrottled(true);
        setPage((prev) => prev + 1);

        /* 1초동안 스크롤 락 해제 */
        setTimeout(() => {
          setIsThrottled(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isThrottled]);

  return (
    /* 페이지 레아이웃 */
    <div className="px-4 py-8 md:px-10 min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 uppercase">인기 영화</h1>
      {/* 기존 영화 렌더링*/}
      <div className="w-full">{movies.length > 0 && <MovieCarousel movies={movies} />}</div>

      {/* 로딩 UI : 추가 데이터 부를때 스켈레톤 카드 */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
          {[1, 2, 3, 4, 5].map((n) => (
            <SkeletonCard key={`loader-${n}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieListPage;
