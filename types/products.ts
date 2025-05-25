import { Image } from "./global";

export type Product = {
  id: number;
  name: string;
  images: Image[];
  price: number;
  discount_price?: number;
};
