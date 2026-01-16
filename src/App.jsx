import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/details" element={<MovieDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
