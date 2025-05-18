import BannerSlider from "./BannerSlider";

export type Banner = {
  id: number;
  image: string;
  title: string;
  description: string;
  backgroundColor: string;
  imagePosition: string;
  textPosition: string;
  buttonText: string;
  buttonLink: string;
  delay?: number;
};

const banners: Banner[] = [
  {
    id: 1,
    image: "/images/banners/banner-1.png",
    title: "Elegance Redefined",
    description: "Discover timeless styles for every occasion.",
    backgroundColor: "bg-gradient-to-r from-pink-50 to-pink-100",
    imagePosition: "right",
    textPosition: "left",
    buttonText: "Shop Collection",
    buttonLink: "/collections",
  },
  {
    id: 2,
    image: "/images/banners/banner-4.png",
    title: "Elevate Your Wardrobe",
    description: "Timeless pieces to refresh your look for every season.",
    backgroundColor: "bg-gradient-to-r from-blue-50 to-blue-100",
    imagePosition: "left",
    textPosition: "right",
    buttonText: "Shop Collection",
    buttonLink: "/collections",
    delay: 4000, // 4 seconds
  },
  {
    id: 3,
    image: "/images/banners/banner-3.png",
    title: "Elevate Your Wardrobe",
    description: "Timeless pieces to refresh your look for every season.",
    backgroundColor: "bg-gradient-to-r from-yellow-50 to-red-100",
    imagePosition: "right",
    textPosition: "left",
    buttonText: "Shop Collection",
    buttonLink: "/collections",
  },
];

export default function Banners() {

  return (
    <section>
      <BannerSlider banners={banners} />
    </section>
  );
}
