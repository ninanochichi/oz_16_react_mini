import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import "./App.css";
import SkeletonCard from "./components/SkeletonCard";

const MovieListPage = lazy(() => import("./pages/MovieListPage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));

function App() {
  return (
    <Suspense
      fallback={
        <div style={{ display: "flex", gap: "20px", padding: "20px", background: "#000" }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MovieListPage />} />
          <Route path="/details/:movieId" element={<MovieDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
