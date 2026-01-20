import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

function NavBar({ theme, toggleTheme }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      navigate(`/search?mq=${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm, navigate]);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-base-200/90 backdrop-blur-md px-6 py-4 md:px-12 border-b border-base-300 transition-colors duration-300">
      <Link to="/" className="shrink-0">
        <h2 className="text-2xl md:text-3xl font-black text-[#E50914] tracking-tighter uppercase not-italic">
          MovieApp
        </h2>
      </Link>

      <div className="flex flex-1 justify-end px-4 max-w-lg">
        <div className="relative w-full group">
          <input
            type="text"
            placeholder="제목, 사람, 장르"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-base-100 text-base-content text-sm border border-base-300 px-10 py-1.5 focus:outline-none focus:border-primary transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
      </div>
      <ul className="hidden md:flex items-center space-x-6 ml-6">
        <li>
          <button onClick={toggleTheme} className="text-xl hover:scale-110 transition-transform" title="테마 변경">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </li>
        <li>
          <Link to="/" className="text-sm font-bold hover:opacity-70 transition">
            홈
          </Link>
        </li>
        <li>
          <button className="bg-[#E50914] text-white text-xs px-4 py-1.5 rounded-sm font-bold hover:bg-[#b20710] transition-colors">
            로그인
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
