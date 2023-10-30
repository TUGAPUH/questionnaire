import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import Slide1 from "./img/slide1.jpg";
import Slide2 from "./img/slide2.jpg";
import Slide3 from "./img/slide3.jpg";

export const Slider = () => {
  const slides = [Slide1, Slide2, Slide3];
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide, ind) => {
          return (
            <SwiperSlide key={ind}>
              <img
                src={slide}
                alt={ind}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
