"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
