import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type CategoryCardProps = {
  category: {
    id: number;
    name: string;
    image: string;
  };
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="relative aspect-[3/3] overflow-hidden rounded-lg cursor-pointer">
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="w-full h-full object-cover hover:scale-105 transition-all duration-1000"
        loading="lazy"
      />

      <div className="group absolute bottom-10 left-1/2 -translate-x-1/2 py-4 px-8 
      bg-white rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300">
        <span>{category.name}</span>
        <ArrowUpRight
          strokeWidth={1.5}
          className="text-white size-6 w-0 scale-0 group-hover:w-6 group-hover:scale-100 transition-all duration-300"
        />
      </div>
    </div>
  );
}
