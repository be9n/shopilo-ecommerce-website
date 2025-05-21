"use client";

import React from "react";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types/categories";
import MainSlider, {
  BreakpointsConfig,
} from "@/app/[locale]/(shop)/components/MainSlider";
import Container from "@/components/Container";

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
  const breakpoints: BreakpointsConfig = {
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
  };

  return (
    <section className="py-6" data-aos="fade-up">
      <Container>
        <MainSlider
          sliderKey={"category"}
          items={categories}
          renderItem={(category) => <CategoryCard category={category} />}
          breakpoints={breakpoints}
          spaceBetween={12}
          speed={800}
        />
      </Container>
    </section>
  );
}
