import { Poppins } from "next/font/google";

// Main font used throughout the app
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
