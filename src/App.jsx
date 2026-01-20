import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import "./App.css";
import SkeletonCard from "./components/SkeletonCard";

const MovieListPage = lazy(() => import("./pages/MovieListPage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
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
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
