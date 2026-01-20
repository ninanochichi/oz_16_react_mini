import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MovieCard from "./MovieCard";

function MovieCarousel({ movies }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={15}
      slidesPerView={5}
      navigation={true}
      pagination={{ clickable: true }}
      className="mySwiper !overflow-visible !py-10"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCard movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieCarousel;
