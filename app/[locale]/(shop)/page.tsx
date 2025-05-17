import React from "react";
import Banners from "./components/Banners";
import CategorySlider from "./components/CategorySlider";
import dynamic from "next/dynamic";

const BestSellers = dynamic(() => import("./components/BestSellers"));

export default async function HomePage() {

  return (
    <div>
      <Banners />
      <CategorySlider />
      <div className="mt-24">
        <BestSellers />
      </div>
    </div>
  );
}
