import ProductSlider from "./ProductSlider";
import { Product } from "@/types/products";
export default function BestSellers({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="py-6" data-aos="fade-up">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-8">
        Best Sellers
      </h1>
      <ProductSlider products={products} />
    </section>
  );
}
