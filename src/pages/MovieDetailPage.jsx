import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TMDB_API_BASE_URL, TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_BASE_URL } from "../constants/urls";

function MovieDetailPage() {
  /* URL 파라미터 */
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    /* API 호출 */
    const getMovieDetail = async () => {
      const baseUrl = TMDB_API_BASE_URL.endsWith("/") ? TMDB_API_BASE_URL.slice(0, -1) : TMDB_API_BASE_URL;

      const url = `${baseUrl}/movie/${movieId}?language=ko-KR`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      };

      try {
        const res = await fetch(url, options);
        const data = await res.json();

        if (!data.overview) {
          const engRes = await fetch(`${baseUrl}/movie/${movieId}?language=en-US`, options);
          const engData = await engRes.json();
          setMovie(engData);
        } else {
          setMovie(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (movieId) getMovieDetail();
  }, [movieId]);

  // 로딩
  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#141414] text-white text-2xl font-bold">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* 상단 배경 이미지 */}
      <div className="relative h-[50vh] w-full">
        <img
          src={`${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
      </div>

      {/* 포스터, 제목, 줄거리  */}
      <div className="relative -mt-32 px-10 flex flex-col md:flex-row gap-10 items-start">
        {/* 포스터 */}
        <img
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-64 md:w-80 rounded-xl shadow-2xl border border-gray-700"
        />

        {/* 텍스트 정보 */}
        <div className="flex flex-col gap-6 md:mt-24">
          <h1 className="text-5xl md:text-7xl font-black">{movie.title}</h1>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-500 uppercase tracking-widest">Storyline</h2>
            <p className="max-w-3xl text-lg md:text-2xl leading-relaxed text-gray-200">
              {movie.overview || "등록된 줄거리가 없습니다."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
