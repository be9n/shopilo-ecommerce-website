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
      <Price price={discountPrice} type="currentPrice" />
      <Price price={price} type="oldPrice" />
    </div>
  ) : (
    <Price price={price} type="currentPrice" />
  );
}

const Price = ({
  price,
  type,
}: {
  price: number;
  type: "currentPrice" | "oldPrice";
}) => {
  return (
    <span
      className={cn(
        "text-primary text-sm font-medium",
        type === "oldPrice" &&
          "line-through text-gray-500 text-xs md:text-sm lg:text-base",
        type === "currentPrice" &&
          "text-primary text-sm md:text-base lg:text-md"
      )}
    >
      ${price.toFixed(2)}
    </span>
  );
};
