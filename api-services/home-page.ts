import api from "@/lib/api";
import { Category } from "@/types/categories";
import { Product } from "@/types/products";

export type HomePageResponse = {
  categories: Category[];
  best_selling_products: Product[];
};

export async function getHomePage(): Promise<HomePageResponse> {
  const { data: response } = await api.get("/home_page");

  return response.data;
}
