"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import Container from "@/components/ui/Container";
import Link from "next/link";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import { Banner } from "./Banners";

import "@/app/[locale]/css/banners.css";

export default function BannerSlider({ banners }: { banners: Banner[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

  // Function to handle slide change and update delay
  const handleSlideChange = (swiper: SwiperType) => {
    const currentIndex = swiper.realIndex;
    const currentBanner = banners[currentIndex];

    // Set the autoplay delay for the current slide
    if (swiper.autoplay) {
      // Type safety check
      swiper.autoplay.stop();
      // Update the delay safely
      if (typeof swiper.params.autoplay === "object" && currentBanner.delay) {
        swiper.params.autoplay.delay = currentBanner.delay;
      }
      swiper.autoplay.start();
    }
  };

  return (
    <div>
      <Swiper
        className="relative"
        modules={[EffectFade, Pagination, Autoplay]}
        effect="fade"
        pagination={{
          clickable: true,
          bulletClass: "banners-slider-bullet",
          bulletActiveClass: "banners-slider-bullet-active",
          el: ".banners-slider-pagination",
        }}
        autoplay={{
          delay: banners[0].delay || 3000, // Initial delay from first slide
        }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <section
              className={`${banner.backgroundColor} relative overflow-hidden h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] xl:h-[900px]`}
            >
              <Container
                className={cn(
                  "h-full relative z-50 flex items-center",
                  banner.textPosition === "right" && "sm:justify-end"
                )}
              >
                {/* Text Content - Centered in the banner */}
                <div className={cn("max-w-[280px] md:max-w-md text-start")}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-medium mb-2 md:mb-4 banner-content-fade-in banner-content-fade-in-h1">
                    {banner.title}
                  </h1>
                  <p className="text-sm lg:text-lg mb-4 lg:mb-6 banner-content-fade-in banner-content-fade-in-p">
                    {banner.description}
                  </p>
                  <Link
                    href={banner.buttonLink}
                    className={cn(
                      "bg-black text-white px-6 py-2 md:px-8 md:py-3 text-sm md:text-base rounded-full inline-block hover:bg-gray-800 transition-colors banner-content-fade-in banner-content-fade-in-button"
                    )}
                  >
                    {banner.buttonText}
                  </Link>
                </div>
              </Container>

              <div
                className={cn(
                  "banner-image absolute bottom-0 h-full z-0",
                  banner.imagePosition === "right" ? "right-0" : "left-0"
                )}
              >
                <Image
                  src={banner.image}
                  alt="Model in elegant black suit"
                  width={944}
                  height={939}
                  priority
                  className="object-contain h-full w-full"
                />
              </div>
            </section>
          </SwiperSlide>
        ))}
        <div className="banners-slider-pagination"></div>
      </Swiper>
    </div>
  );
}
