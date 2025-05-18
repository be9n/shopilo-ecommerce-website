"use client";

import { Heart, Search, ShoppingBag, LucideIcon, User } from "lucide-react";
import React from "react";
import LoginFormSheet from "../LoginFormSheet";

export default function Icons() {
  return (
    <div className="flex items-center gap-4">
      <SearchIcon />
      <div className="hidden md:flex items-center gap-4">
        <ProfileIcon />
        <FavoriteIcon />
      </div>
      <CartIcon />
    </div>
  );
}

const SearchIcon = () => {
  return <MainHeaderIcon icon={Search} />;
};

const ProfileIcon = () => {
  return <LoginFormSheet trigger={<MainHeaderIcon icon={User} />} />;
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

const MainHeaderIcon = ({
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
      className={`size-5 md:size-6 hover:text-primary cursor-pointer transition-all duration-300 ${className}`}
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
    <div className="relative">
      {children}
      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs size-4 rounded-full flex items-center justify-center">
        {count}
      </span>
    </div>
  );
};
