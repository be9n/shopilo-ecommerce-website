"use client";

import LoginFormSheet from "../LoginFormSheet";
import { MainHeaderIcon } from "./Icons";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";

export default function Profile() {
  const { user } = useAuth();

  return user ? (
    <Link href="/account">
      <MainHeaderIcon icon={User} />
    </Link>
  ) : (
    <LoginFormSheet trigger={<MainHeaderIcon icon={User} />} />
  );
}
