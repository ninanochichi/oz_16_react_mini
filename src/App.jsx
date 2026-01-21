import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import "./App.css";
import SkeletonCard from "./components/SkeletonCard";
import { useSupabaseAuth } from "./supabase/context";

const MovieListPage = lazy(() => import("./pages/MovieListPage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  /* context 유저 정보 함수 */
  const { getUserInfo } = useSupabaseAuth();

  /* 처음 렌더링할 때 로그인 확인 */
  useEffect(() => {
    const initAuth = async () => {
      try {
        await getUserInfo(); // 비동기 작업
      } catch (error) {
        console.error("인증 정보를 가져오는 중 오류 발생:", error);
      }
    };
    initAuth();
  }, [getUserInfo]);

  /* 테마 설정 */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    /* 로딩중일때 UI */
    <Suspense
      fallback={
        <div className="flex gap-5 p-5 bg-black">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      }
    >
      <Routes>
        <Route element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
          <Route path="/" element={<MovieListPage />} />
          <Route path="/details/:movieId" element={<MovieDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
