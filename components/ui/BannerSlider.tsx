"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Container from "@/components/ui/Container";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Banner type definition
interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  bgColor: string;
}

// Sample banner data - you can replace with your actual data from an API
const banners: BannerSlide[] = [
  {
    id: 1,
    title: "Elegance Redefined",
    subtitle: "Discover timeless styles for every occasion.",
    buttonText: "Shop Collection",
    buttonLink: "/collections",
    imageSrc: "/images/banners/banner-1.png",
    bgColor: "from-pink-50 to-pink-100",
  },
  {
    id: 2,
    title: "Style Redefined",
    subtitle: "Elevate your wardrobe with the latest trends.",
    buttonText: "Shop Now",
    buttonLink: "/collections/new",
    imageSrc: "/images/banners/banner-2.png",
    bgColor: "from-blue-50 to-indigo-100",
  },
  {
    id: 3,
    title: "Summer Collection",
    subtitle: "Fresh styles for the warmer days ahead.",
    buttonText: "Explore",
    buttonLink: "/collections/summer",
    imageSrc: "/images/banners/banner-3.png",
    bgColor: "from-amber-50 to-yellow-100",
  },
];
export default function BannerSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} ${
              index === activeIndex ? "bg-black" : "bg-gray-300"
            } w-2.5 h-2.5"></span>`;
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="banner-slider"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className={`bg-gradient-to-r ${banner.bgColor} h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] xl:h-[900px] relative`}
            >
              {/* Text Content */}
              <Container className="h-full relative">
                <div className="absolute px-5 md:px-0 left-0 md:left-4 lg:left-10 top-1/2 transform -translate-y-1/2 z-10 max-w-[280px] md:max-w-md">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                    {banner.title.split(" ").map((word, i, arr) =>
                      i === arr.length - 1 ? (
                        <React.Fragment key={`word-${i}`}>
                          <br />
                          {word}
                        </React.Fragment>
                      ) : (
                        <span key={`word-${i}`}>{word} </span>
                      )
                    )}
                  </h1>
                  <p className="hidden md:block text-sm lg:text-lg mb-4 lg:mb-6">
                    {banner.subtitle}
                  </p>
                  <Link
                    href={banner.buttonLink}
                    className="bg-black text-white px-6 py-2 md:px-8 md:py-3 text-sm md:text-base rounded-md inline-block hover:bg-gray-800 transition-colors"
                  >
                    {banner.buttonText}
                  </Link>
                </div>
              </Container>

              {/* Image */}
              <div className="absolute bottom-0 right-0 h-full z-0">
                <Image
                  src={banner.imageSrc}
                  alt={banner.title}
                  width={1000}
                  height={1200}
                  priority={banner.id === 1}
                  className="object-contain object-bottom h-full"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for navigation and pagination */}
      <style jsx global>{`
        .banner-slider .swiper-button-next,
        .banner-slider .swiper-button-prev {
          display: none;
        }

        .banner-slider .swiper-pagination {
          bottom: 20px !important;
        }

        .banner-slider .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          margin: 0 4px;
          opacity: 1;
          transition: all 0.3s;
        }
      `}</style>
    </div>
  );
}
