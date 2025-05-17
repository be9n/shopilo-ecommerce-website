import { SliderProduct } from "@/types/products";
import ProductSlider from "./ProductSlider";

const products: SliderProduct[] = [
  {
    id: 1,
    name: "Polo Neck T-Shirt",
    image: "/images/products/product-1.jpg",
    price: 130.52,
    discountPrice: 100.0,
    withHoverEffect: true,
    hoverImage: "/images/products/product-7.jpg",
  },
  {
    id: 2,
    name: "Loose Fit Tee",
    image: "/images/products/product-8.jpg",
    price: 120.0,
    discountPrice: 100.0,
    withHoverEffect: true,
    hoverImage: "/images/products/product-2.jpg",
  },
  {
    id: 3,
    name: "Crop T-Shirt",
    image: "/images/products/product-3.jpg",
    price: 140.0,
    discountPrice: 100.0,
    withHoverEffect: true,
    hoverImage: "/images/products/product-9.jpg",
  },
  {
    id: 4,
    name: "Short Sleeve Sweet",
    image: "/images/products/product-4.jpg",
    price: 100.0,
    discountPrice: 80.0,
    withHoverEffect: true,
    hoverImage: "/images/products/product-11.jpg",
  },
  {
    id: 5,
    name: "Puff Sleeve Shirred Blouse",
    image: "/images/products/product-5.jpg",
    price: 80.0,
    withHoverEffect: false,
  },
  {
    id: 6,
    name: "Printed T-Shirt",
    image: "/images/products/product-6.jpg",
    price: 120.0,
    withHoverEffect: true,
    hoverImage: "/images/products/product-10.jpg",
  },
];

export default function BestSellers() {
  return (
    <section className="py-6" data-aos="fade-up">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-8">
        Best Sellers
      </h1>
      <ProductSlider products={products} />
    </section>
  );
}
