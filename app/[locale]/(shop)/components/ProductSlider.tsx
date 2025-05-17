"use client";

import Container from "@/components/ui/Container";
import { SliderProduct } from "@/types/products";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";

type ProductSliderProps = {
  products: SliderProduct[];
};

export default function ProductSlider({ products }: ProductSliderProps) {
  return (
    <Container>
      <div className="relative">
        <div className="category-slider-next">
          <IoIosArrowForward />
        </div>
        <div className="category-slider-prev">
          <IoIosArrowBack />
        </div>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            bulletClass: "category-slider-bullet",
            bulletActiveClass: "category-slider-bullet-active",
            el: ".category-slider-pagination",
          }}
          navigation={{
            nextEl: ".category-slider-next",
            prevEl: ".category-slider-prev",
            disabledClass: "category-slider-navigation-disabled",
          }}
          speed={800}
          breakpoints={{
            0: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 2,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 4,
              slidesPerGroup: 2,
              spaceBetween: 24,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
          <div className="category-slider-pagination"></div>
        </Swiper>
      </div>
    </Container>
  );
}
