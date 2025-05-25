"use client";

import React from "react";
import CategoryCard from "./CategoryCard";
import MainSlider, {
  BreakpointsConfig,
} from "@/app/[locale]/(shop)/components/MainSlider";
import Container from "@/components/Container";
import { Category } from "@/types/categories";

export default function CategorySlider({
  categories,
}: {
  categories: Category[];
}) {
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
