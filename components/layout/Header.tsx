"use client";

import { useState, useEffect, useRef } from "react";
import Container from "../Container";
import { cn } from "@/lib/utils";

export default function Header({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {children}
      </Container>
    </header>
  );
}
