import React from "react";
import Banners from "./components/Banners";
import CategorySlider from "./components/CategorySlider";
import BestSellers from "./components/BestSellers";
import { getHomePage, HomePageResponse } from "@/api-services/home-page";

export default async function HomePage() {
  const homePageData: HomePageResponse = await getHomePage();

  return (
    <div>
      <Banners />
      <CategorySlider categories={homePageData.categories} />
      <div className="mt-24">
        <BestSellers products={homePageData.best_selling_products} />
      </div>
    </div>
  );
}
