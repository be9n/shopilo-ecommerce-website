"use client";

import { useAuth } from "@/context/AuthProvider";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const { logout } = useAuth();
  return <Button className="shadow cursor-pointer" onClick={() => logout()}>Logout</Button>;
}
