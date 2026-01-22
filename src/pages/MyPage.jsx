import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSupabaseAuth } from "../supabase/context";
import { DEFAULT_PHOTO } from "../constants/urls";
import MovieCard from "../components/MovieCard";

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  /* 상태 관리: 북마크된 영화 목록 */
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/login");
      return;
    }
    /* 상세페이지에서 저장한 북마크 데이터 불러오기 */
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarkedMovies(saved);
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-10 flex gap-10">
      {/* 좌측 사이드바 */}
      <div className="w-64 flex flex-col items-center flex-shrink-0">
        <div className="w-32 h-32 mb-4">
          <img
            src={user.profileImageUrl || DEFAULT_PHOTO}
            alt="Profile"
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <p className="text-xl font-bold mb-10">{user.userName}님</p>

        <nav className="w-full space-y-4">
          <button className="w-full text-left px-4 py-2 hover:bg-zinc-800 rounded transition-colors text-gray-300 hover:text-white flex justify-between items-center">
            회원정보 <span className="text-xs">〉</span>
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-zinc-800 rounded transition-colors text-gray-300 hover:text-white flex justify-between items-center">
            나의 리뷰 <span className="text-xs">〉</span>
          </button>
          <button className="w-full text-left px-4 py-2 bg-zinc-800 text-white rounded flex justify-between items-center">
            위시리스트 <span className="text-xs">〉</span>
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-zinc-800 rounded transition-colors text-gray-300 hover:text-white flex justify-between items-center">
            고객센터 <span className="text-xs">〉</span>
          </button>
        </nav>
      </div>

      {/* 우측 메인 콘텐츠 */}
      <div className="flex-1 bg-zinc-900/50 rounded-lg p-8 border border-zinc-800">
        <header className="border-b border-zinc-700 pb-4 mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-wider">Wishlist</h2>
        </header>

        {/* 북마크 한 MovieCard 나열  */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {bookmarkedMovies.length > 0 ? (
            bookmarkedMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            /* 데이터가 비어있을 때의 대체 UI */
            <div className="col-span-full py-20 text-center">
              <p className="text-zinc-500 italic mb-4">찜한 영화가 없습니다.</p>
              <button onClick={() => navigate("/")} className="text-sm text-red-600 hover:underline">
                영화 보러 가기
              </button>
            </div>
          )}
        </div>

        {/* 계정 정보 섹션 */}
        <div className="mt-20 border-t border-zinc-800 pt-6">
          <h3 className="text-lg font-semibold mb-2">계정 이메일</h3>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
