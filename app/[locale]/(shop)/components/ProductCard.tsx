"use client";

import { Product } from "@/types/products";
import Image from "next/image";
import ProductCardActions from "./ProductCardActions";
import ProductPrice from "./ProductPrice";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="">
      <div className="group/card cursor-pointer aspect-[3/4.3] relative rounded-lg overflow-hidden">
        <div className="absolute top-2 right-2 z-100">
          <ProductCardActions />
        </div>
        <Image
          src={product.images[0].url}
          alt={product.images[0].name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover"
        />
        {product.images.length > 1 && (
          <Image
            src={product.images[1].url}
            alt={product.images[1].name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="relative z-50 opacity-0 object-cover group-hover/card:opacity-100 group-hover/card:scale-105
            transition-all duration-600 select-none"
          />
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm md:text-base lg:text-lg font-medium mb-1">
          {product.name}
        </h3>
        <ProductPrice
          price={product.price}
          discountPrice={product.discount_price}
        />
      </div>
    </div>
  );
}
