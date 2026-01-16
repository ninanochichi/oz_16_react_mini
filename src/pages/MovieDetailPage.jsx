import MovieDetail from "../components/MovieDetail";
import movieDetailData from "../data/movieDetailData.json";

function MovieDetailPage() {
  return <MovieDetail movie={movieDetailData} />;
}

export default MovieDetailPage;
