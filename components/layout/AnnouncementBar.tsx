"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaSnapchat } from "react-icons/fa";
import Container from "../Container";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com",
    icon: FaFacebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com",
    icon: FaInstagram,
  },
  {
    name: "Twitter",
    href: "https://www.twitter.com",
    icon: FaTwitter,
  },
  {
    name: "Snapchat",
    href: "https://www.snapchat.com",
    icon: FaSnapchat,
  },
];

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#313030] text-white">
      <Container className="flex items-center justify-between h-8 md:h-10 py-2">
        <div className="flex items-center gap-2 md:gap-4">
          {socialLinks.map((links) => (
            <Link href={links.href} key={links.name}>
              <links.icon className="text-white size-3 md:size-4" />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
