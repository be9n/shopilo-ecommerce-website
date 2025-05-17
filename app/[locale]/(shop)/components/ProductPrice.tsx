import { cn } from "@/lib/utils";

type ProductPriceProps = {
  price: number;
  discountPrice?: number;
};

export default function ProductPrice({
  price,
  discountPrice,
}: ProductPriceProps) {
  return discountPrice ? (
    <div className="flex items-center gap-2">
      <Price price={discountPrice} type="with-discount" />
      <Price price={price} type="without-discount" />
    </div>
  ) : (
    <Price price={price} type="without-discount" />
  );
}

const Price = ({
  price,
  type,
}: {
  price: number;
  type: "with-discount" | "without-discount";
}) => {
  return (
    <span
      className={cn(
        "text-primary text-sm font-medium",
        type === "without-discount" &&
          "line-through text-gray-500 text-xs md:text-sm lg:text-base",
        type === "with-discount" &&
          "text-primary text-sm md:text-base lg:text-md"
      )}
    >
      ${price.toFixed(2)}
    </span>
  );
};
