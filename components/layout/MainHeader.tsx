"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Container from "../ui/Container";
import { NavList } from "./NavList";
import Icons from "./Icons";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";

export default function MainHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isOnTop, setIsOnTop] = useState(true);
  const threshold = 100; // Minimum scroll before hide/show behavior kicks in

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // At the top - always show
      if (currentScrollY <= threshold) {
        setIsVisible(true);
        setIsOnTop(true);
        return;
      }

      setIsOnTop(false);

      // Past threshold - show/hide based on scroll direction
      // Scrolling down - hide
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      }
      // Scrolling up - show
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      // Update last scroll position
      lastScrollY.current = currentScrollY;
    };

    // Initial check
    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array so the effect runs only once

  return (
    <header
      className={cn(
        "w-full bg-white sticky top-0 left-0 z-50 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
        !isOnTop && "shadow"
      )}
    >
      <Container className="h-[75px] grid grid-cols-3 items-center">
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
      </Container>
    </header>
  );
}
