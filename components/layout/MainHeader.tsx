import Link from "next/link";
import { NavList } from "./NavList";
import Icons from "./Icons";
import MobileNav from "./MobileNav";
import Header from "./Header";

export default async function MainHeader() {
  return (
    <Header>
      <div className="md:hidden flex justify-start">
        <MobileNav />
      </div>
      <Link
        href="/"
        className="font-semibold text-2xl md:text-3xl flex justify-center md:justify-start"
      >
        Shopilo
      </Link>
      <div className="hidden md:flex items-center justify-center">
        <NavList />
      </div>
      <div className="flex items-center justify-end">
        <Icons />
      </div>
    </Header>
  );
}
