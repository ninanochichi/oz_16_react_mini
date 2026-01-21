import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { TMDB_API_BASE_URL } from "../constants/urls";
import MovieCard from "../components/MovieCard";

function SearchPage() {
  /* url에서 mq 호출 */
  const [searchParams] = useSearchParams();
  const mq = searchParams.get("mq");

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /* 예외 처리 : 검색어 없으면 초기화 */
    if (!mq) {
      setMovies([]);
      return;
    }

    /* API 호출 : 검색어 맞게 */
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const url = `${TMDB_API_BASE_URL}/search/movie?query=${mq}&language=ko-KR&page=1`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        const filtered = data.results.filter((movie) => movie.adult === false);
        setMovies(filtered);
      } catch (err) {
        console.error("앗, 검색하다가 에러가 났어요:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [mq]);

  return (
    <div className="px-4 py-8 md:px-10 text-white min-h-screen bg-[#141414]">
      {!mq ? (
        // 검색 전 초기 화면
        <div className="flex flex-col items-center justify-center mt-40 gap-4">
          <h2 className="text-2xl md:text-4xl font-bold">🔍 어떤 영화를 찾고 계신가요?</h2>
          <p className="text-gray-400">영화 제목을 입력해 보세요!</p>
        </div>
      ) : isLoading ? (
        /* 로딩중 */
        <div className="flex justify-center mt-20">
          <p className="text-xl animate-pulse text-gray-400">영화 데이터를 열심히 찾고 있어요...</p>
        </div>
      ) : (
        <>
          {/* 검색 결과 제목 */}
          <h2 className="text-xl md:text-3xl font-bold mb-8 text-left uppercase">
            🔍 '{mq}' <span className="text-gray-400">검색 결과</span>
          </h2>

          {/* 결과 렌더링 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
            {movies.length > 0 ? (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              /* 결과 없음 */
              <div className="col-span-full mt-20 text-center space-y-4">
                <p className="text-2xl font-bold text-gray-300">⚠️ '{mq}'에 대한 검색 결과가 없네요.</p>
                <p className="text-gray-500">철자가 틀렸거나 등록되지 않은 영화일 수 있습니다.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPage;
