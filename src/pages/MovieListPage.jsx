import { useState } from "react";
import movieListData from "../data/movieListData.json";
import MovieCarousel from "../components/MovieCarousel";

function MovieListPage() {
  const [movies] = useState(movieListData.results);

  return (
    <div>
      <h1>Movie List</h1>
      <MovieCarousel movies={movies} />
    </div>
  );
}

export default MovieListPage;
