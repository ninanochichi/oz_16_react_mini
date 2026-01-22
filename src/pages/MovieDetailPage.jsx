import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { TMDB_API_BASE_URL, TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_BASE_URL } from "../constants/urls";

function MovieDetailPage() {
  /* URL 파라미터 */
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

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

        /* 한국어 줄거리 없으면 영어 */
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

  /* 북마크 추가 핸들러 */
  const handleBookmark = () => {
    const token = localStorage.getItem("sb-mgcssrxvrdinivcuwvck-auth-token");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    /* 로그인 여부 */
    if (!token && isLoggedIn !== "true") {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }
    /* 기존 북마크 불러오기 */
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    /* 중복 등록 */
    const isAlreadyBookmarked = savedBookmarks.some((item) => item.id === movie.id);

    if (isAlreadyBookmarked) {
      alert("이미 북마크에 추가된 영화입니다.");
    } else {
      const newBookmarks = [...savedBookmarks, movie];
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      alert("마이페이지에 등록되었습니다!");
    }
  };

  /* 로딩 */
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

      {/* 포스터 및 영화 상세 정보  */}
      <div className="relative -mt-32 px-10 flex flex-col md:flex-row gap-10 items-start">
        {/* 포스터 이미지 */}
        <img
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-64 md:w-80 rounded-xl shadow-2xl border border-gray-700"
        />
        {/* 텍스트 설명 */}
        <div className="flex flex-col gap-6 md:mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h1 className="text-5xl md:text-7xl font-black">{movie.title}</h1>

            {/* 북마크 버튼 */}
            <button
              onClick={handleBookmark}
              className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors w-fit"
            >
              북마크 추가
            </button>
          </div>

          {/* 줄거리 섹션 */}
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
