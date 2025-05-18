"use client";

import React from "react";
import { SliderProduct } from "@/types/products";
import ProductCard from "./ProductCard";
import MainSlider, {
  BreakpointsConfig,
} from "@/app/[locale]/(shop)/components/MainSlider";
import Container from "@/components/ui/Container";

type ProductSliderProps = {
  products: SliderProduct[];
};

export default function ProductSlider({ products }: ProductSliderProps) {
  const breakpoints: BreakpointsConfig = {
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
  };

  return (
    <Container>
      <MainSlider
        sliderKey={"product"}
        items={products}
        renderItem={(product) => <ProductCard product={product} />}
        breakpoints={breakpoints}
        speed={800}
      />
    </Container>
  );
}
