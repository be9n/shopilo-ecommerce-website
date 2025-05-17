"use client";

import Container from "@/components/ui/Container";
import React from "react";
import CategoryCard from "./CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Category } from "@/types/categories";

const categories: Category[] = [
  {
    id: 1,
    name: "Sportswear",
    image: "/images/categories/cat1.jpg",
  },
  {
    id: 2,
    name: "Clothes & Accessories",
    image: "/images/categories/cat2.jpg",
  },
  {
    id: 3,
    name: "Shoes",
    image: "/images/categories/cat3.jpg",
  },
  {
    id: 4,
    name: "Bags",
    image: "/images/categories/cat4.jpg",
  },
  {
    id: 5,
    name: "Accessories",
    image: "/images/categories/cat5.jpg",
  },
];

export default function CategorySlider() {
  return (
    <section className="py-6" data-aos="fade-up">
      <Container className="">
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
            spaceBetween={12}
            breakpoints={{
              0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              510: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup: 2,
              },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <CategoryCard category={category} />
              </SwiperSlide>
            ))}
            <div className="category-slider-pagination"></div>
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
