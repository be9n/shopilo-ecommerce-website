"use client";

import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export type BreakpointsConfig = {
  [width: number]: {
    slidesPerView: number;
    slidesPerGroup: number;
    spaceBetween?: number;
  };
};

interface SliderItem {
  id?: string | number;
  [key: string]: unknown;
}

interface MainSliderProps<T extends SliderItem> {
  sliderKey: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  slidesPerView?: number;
  slidesPerGroup?: number;
  breakpoints?: BreakpointsConfig;
  spaceBetween?: number;
  speed?: number;
}

export default function MainSlider<T extends SliderItem>({
  sliderKey,
  items,
  renderItem,
  breakpoints,
  slidesPerView = 1,
  slidesPerGroup = 1,
  spaceBetween = 0,
  speed = 800,
}: MainSliderProps<T>) {
  return (
    <div className="relative">
      <div className={`slider-next ${sliderKey}-slider-next`}>
        <IoIosArrowForward />
      </div>
      <div className={`slider-prev ${sliderKey}-slider-prev`}>
        <IoIosArrowBack />
      </div>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
          bulletClass: "slider-bullet",
          bulletActiveClass: "slider-bullet-active",
          el: `.${sliderKey}-slider-pagination`,
        }}
        navigation={{
          nextEl: `.${sliderKey}-slider-next`,
          prevEl: `.${sliderKey}-slider-prev`,
          disabledClass: "slider-navigation-disabled",
        }}
        speed={speed}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id || index}>{renderItem(item)}</SwiperSlide>
        ))}
        <div
          className={`slider-pagination ${sliderKey}-slider-pagination`}
        ></div>
      </Swiper>
    </div>
  );
}
