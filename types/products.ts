import { Image } from "./global";

export type DiscountType = "percentage" | "fixed";

export type Product = {
  id: number;
  name: string;
  images: Image[];
  price: number;
  discount_price?: number;
  discount_type?: DiscountType;
  discount_value?: number;
};

