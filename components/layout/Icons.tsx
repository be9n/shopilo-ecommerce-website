import { Heart, Search, ShoppingBag, LucideIcon } from "lucide-react";
import Profile from "./Profile";

export default function Icons() {
  return (
    <div className="flex items-center gap-4">
      <SearchIcon />
      <div className="hidden md:flex items-center gap-4">
        <Profile />
        <FavoriteIcon />
      </div>
      <CartIcon />
    </div>
  );
}

const SearchIcon = () => {
  return <MainHeaderIcon icon={Search} />;
};

const FavoriteIcon = () => {
  return (
    <BadgeIcon count={0}>
      <MainHeaderIcon icon={Heart} />
    </BadgeIcon>
  );
};

const CartIcon = () => {
  return (
    <BadgeIcon count={0}>
      <MainHeaderIcon icon={ShoppingBag} />
    </BadgeIcon>
  );
};

export const MainHeaderIcon = ({
  icon: Icon,
  className = "",
  strokeWidth = 1.5,
}: {
  icon: LucideIcon;
  className?: string;
  strokeWidth?: number;
}) => {
  return (
    <Icon
      strokeWidth={strokeWidth}
      className={`size-5 md:size-6 hover:text-primary cursor-pointer transition-all duration-300 group-hover/badge:text-primary ${className}`}
    />
  );
};

const BadgeIcon = ({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative cursor-pointer group/badge">
      {children}
      <span
        className="absolute -top-1 -right-1 bg-primary text-white text-xs size-4 rounded-full
      flex items-center justify-center select-none"
      >
        {count}
      </span>
    </div>
  );
};
