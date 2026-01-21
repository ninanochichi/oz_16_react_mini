import { Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import NavButton from "./NavButton";
import { useSupabaseAuth } from "../supabase/context";

const DEFAULT_PHOTO = "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-v0h1ih4a2ms1m5ka.jpg";

function NavBar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  /* Context API : 전역 유저 상태와 로그아웃 함수 */
  const { user, logout } = useSupabaseAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /* 조건부 렌더링 : 유저있을때 로그인 상태 확인 */
  const isLoggedIn = !!user;
  const userName = user?.userName || "사용자";
  const userPhoto = user?.profileImageUrl || DEFAULT_PHOTO;

  /* 페이지 이동할때 드롭다운 메뉴 닫기 */
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      navigate(`/search?mq=${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm, navigate]);

  /* ✅ 로그아웃 처리 : 비동기 -> 세션종료 후 메인 이동 */
  const handleLogout = async () => {
    await logout(); // context 사용
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-base-200/90 backdrop-blur-md px-6 py-4 md:px-12 border-b border-base-300 transition-colors duration-300">
      <Link to="/" className="shrink-0">
        <h2 className="text-2xl md:text-3xl font-black text-[#E50914] tracking-tighter uppercase not-italic">
          MovieApp
        </h2>
      </Link>

      <ul className="hidden md:flex items-center space-x-6 ml-6">
        <li>
          <button onClick={toggleTheme} className="text-xl">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </li>

        {/* 로그인 여부마다 UI 설정 */}
        {!isLoggedIn ? (
          <>
            {/* 로그인 전 */}
            <li>
              <NavButton to="/signup" label="회원가입" />
            </li>
            <li>
              <NavButton to="/login" label="로그인" primary />
            </li>
          </>
        ) : (
          <li className="relative flex items-center gap-3">
            {/* 로그인 후 */}
            <span className="text-xs font-bold text-base-content">{userName}님</span>
            <div className="flex items-center cursor-pointer gap-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <img
                src={userPhoto}
                alt="Profile"
                className="w-8 h-8 rounded object-cover"
                onError={(e) => {
                  e.target.src = DEFAULT_PHOTO;
                }}
              />
              <span className="text-xs text-base-content">▼</span>
            </div>

            {/* 드랍다운 메뉴 : 마이페이지,로그아웃 */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-32 bg-base-100 border border-base-300 rounded shadow-xl py-2 z-[100]">
                <Link to="/mypage" className="block px-4 py-2 text-sm hover:bg-base-200">
                  마이 페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-base-200 border-t border-base-300"
                >
                  로그아웃
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
