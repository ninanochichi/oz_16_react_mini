import { TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_BASE_URL } from "../constants/urls";

function MovieDetail({ movie }) {
  /* 예외 처리 */
  if (!movie) return <p className="text-white p-10">영화를 선택해주세요.</p>;

  return (
    <div className="relative min-h-screen bg-[#141414] text-white">
      {/* 상단 배경 */}
      <div className="relative h-[70vh] w-full">
        <img
          src={`${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/20" />
      </div>

      {/* 상세 정보 포스터 및 영화 설명 */}
      <div className="relative -mt-60 px-10 md:px-20 flex flex-col md:flex-row gap-10 items-end">
        <div className="shrink-0 shadow-2xl shadow-black/50">
          <img
            src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-64 rounded-lg border border-white/10"
          />
        </div>

        {/* 텍스트 정보 및 버튼 */}
        <div className="flex flex-col gap-4 pb-4">
          <h1 className="text-5xl font-black tracking-tight">{movie.title}</h1>

          <div className="flex items-center gap-4 text-lg font-bold">
            <span className="text-green-400">평점 ⭐ {movie.vote_average?.toFixed(1)}</span>
            <span className="text-gray-400">{movie.release_date?.split("-")[0]}</span>
            <span className="text-gray-300 text-sm border px-2 py-0.5 rounded">{movie.genres?.[0]?.name}</span>
          </div>

          <p className="max-w-3xl text-lg text-gray-200 leading-relaxed line-clamp-4">
            {movie.overview || "줄거리 정보가 없습니다."}
          </p>

          {/* 액션 버튼 */}
          <div className="flex gap-3 mt-4">
            <button className="bg-white text-black px-8 py-2.5 rounded font-bold hover:bg-gray-200 transition">
              ▶ 재생
            </button>
            <button className="bg-gray-600/60 text-white px-8 py-2.5 rounded font-bold hover:bg-gray-600/80 transition backdrop-blur-sm">
              ⓘ 상세 정보
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
