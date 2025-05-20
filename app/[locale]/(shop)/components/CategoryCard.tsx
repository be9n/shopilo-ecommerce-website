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
    <div className="select-none group/card relative aspect-[3/3.3] max-w-[460px] max-h-[505px] overflow-hidden rounded-lg cursor-pointer">
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="w-full h-full object-cover transition-all duration-1000 group-hover/card:scale-105"
        loading="lazy"
      />

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 py-4 px-8 
        bg-white rounded-full text-center group-hover/card:bg-black group-hover/card:text-white transition-all duration-300"
      >
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm sm:text-base">{category.name}</span>
          <ArrowUpRight
            strokeWidth={1.5}
            className="text-white w-0 scale-0 group-hover/card:w-4 md:group-hover/card:w-5 group-hover/card:scale-100 transition-all duration-300 shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
