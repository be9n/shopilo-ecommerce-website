import {
  Heart,
  Search,
  ShoppingBag,
  User,
  LucideIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

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
  return <MainIcon icon={Search} />;
};

const ProfileIcon = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MainIcon icon={User} />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="max-w-[300px]"
        closeButton={
          <XIcon className="size-5 hover:text-primary transition-all duration-300 cursor-pointer" />
        }
      >
        <SheetHeader>
          <SheetTitle>Login Form</SheetTitle>
          <SheetDescription>
            Here is going to be the login form
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

const FavoriteIcon = () => {
  return (
    <BadgeIcon count={0}>
      <MainIcon icon={Heart} />
    </BadgeIcon>
  );
};

const CartIcon = () => {
  return (
    <BadgeIcon count={0}>
      <MainIcon icon={ShoppingBag} />
    </BadgeIcon>
  );
};

const MainIcon = ({
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
