import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ShoppingBag, Heart, Eye, Share, LucideIcon } from "lucide-react";
import React, { useState } from "react";

export default function ProductCardActions() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        <AddToCartAction />
        <ProductCardActionIcon
          icon={Heart}
          animationOrder={1}
          label="Add to Wishlist"
        />
        <ProductCardActionIcon
          icon={Eye}
          animationOrder={2}
          label="Quick View"
        />
        <ProductCardActionIcon
          icon={Share}
          animationOrder={3}
          label="Share Product"
        />
      </div>
    </TooltipProvider>
  );
}

const AddToCartAction = () => {
  return (
    <ProductCardActionIcon
      icon={ShoppingBag}
      animationOrder={0}
      label="Add to Cart"
    />
  );
};

const ProductCardActionIcon = ({
  icon: Icon,
  animationOrder = 0,
  label,
}: {
  icon: LucideIcon;
  animationOrder: number;
  label: string;
}) => {
  // Calculate delay in milliseconds (0, 100, 200, 300)
  const delayMs = animationOrder * 100;
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // Force icon to stay visible when tooltip is open
  const shouldShowIcon = isTooltipOpen;

  return (
    // Outer span handles the movement animation with delay
    <div
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
      className={cn(
        "product-card-action-slide",
        shouldShowIcon && "!translate-x-0 !opacity-100"
      )}
    >
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "product-card-action-icon",
              isTooltipOpen && "!bg-black !text-white"
            )}
          >
            <Icon strokeWidth={1.5} className="size-3 md:size-4 lg:size-5" />
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          className="bg-black text-white text-xs font-medium"
          sideOffset={10}
          avoidCollisions={false}
        >
          <div className="relative z-20">{label}</div>
          <span className="absolute bg-black h-2 w-2 rotate-45 right-[-4px] top-1/2 -translate-y-1/2"></span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
