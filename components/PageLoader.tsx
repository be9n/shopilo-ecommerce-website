"use client";

import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";

export default function PageLoader() {
  const { isLoading } = useAuth();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] bg-white opacity-0 pointer-events-none transition-opacity duration-500 flex items-center justify-center",
        isLoading && "opacity-100 pointer-events-auto"
      )}
    >
      <span
        className="size-14 border-3 border-t-transparent border-l-transparent 
      border-gray-200 rounded-full animate-spin translate-x-1/2 translate-y-1/2"
      ></span>
    </div>
  );
}
