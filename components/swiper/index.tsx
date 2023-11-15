import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

type Props = {
  product: any;
};

export default function MySwiper({ product }: Props) {
  const data = product[0];
  const images = data?.pro_images.split(",");
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        style={{ height: 500 }}
      >
        {images?.map((item: any, index: any) => (
          <SwiperSlide>
            <img
              key={index}
              src={item}
              alt={`Image ${index}`}
              style={{
                width: "100%",
                height: "500px",
                backgroundPosition: "center",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
