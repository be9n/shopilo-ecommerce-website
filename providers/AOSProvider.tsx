"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      // Global settings
      duration: 800, // Animation duration
      easing: "ease-in-out-quad", // Default easing
      once: true, // Whether animation should happen only once
      offset: 75, // Offset (in px) from the original trigger point
      delay: 0, // Default delay
      //   anchorPlacement: "top-bottom", // Defines which position of the element triggers the animation
    });
  }, []);

  return <>{children}</>;
}
