import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import { TMDB_API_BASE_URL } from "../constants/urls";

function MovieDetailPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetail = () => {
      const url = `${TMDB_API_BASE_URL}/movie/${movieId}?language=ko-KR`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          /*토큰 사용*/
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
        })
        .catch((err) => console.error(err));
    };

    getMovieDetail();
  }, [movieId]); /*다시 실행*/

  /*공백*/
  if (!movie) {
    return <div style={{ color: "white", padding: "20px" }}>로딩 중...</div>;
  }

  /*데이터*/
  return <MovieDetail movie={movie} />;
}

export default MovieDetailPage;
