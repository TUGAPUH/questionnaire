import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import Slide1 from "./img/slide1.png";
import Slide2 from "./img/slide2.png";
import Slide3 from "./img/slide3.png";
import Slide4 from "./img/slide4.png";
import Slide5 from "./img/slide5.png";

export const Slider = () => {
  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5];
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
