"use client";

import { useAuth } from "@/context/AuthProvider";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
export default function LogoutButton() {
  const { signout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="shadow cursor-pointer" onClick={handleLogout}>
      {isLoading ? <Loader2 className="animate-spin translate-x-1/2 translate-y-1/2" /> : "Logout"}
    </Button>
  );
}
