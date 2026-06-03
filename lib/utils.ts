import { DiscountType } from "@/types/products";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDiscount(discount: number | undefined, type: DiscountType) {
  if (type === "percentage") {
    return `${discount}%`;
  }

  return `$${discount}`;
}
