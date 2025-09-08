"use client";

import LoginFormSheet from "../auth/LoginFormSheet";
import { MainHeaderIcon } from "./Icons";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import useEcho from "@/hooks/useEcho";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { user } = useAuth();
  const echo = useEcho();

  interface MessageEvent {
    message: string;
    // Add other properties if needed
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let channel: any = null;

    // Only attempt to subscribe if both echo and user are available
    if (echo && user) {
      console.log("Setting up channel for user ID:", user?.id);

      // Ensure we're starting fresh
      const channelName = `private-channel.${user?.id}`;

      // Try to unsubscribe first in case there's an existing subscription
      echo.leave(channelName);

      // Create new subscription
      channel = echo.private(channelName);
      channel.listen("MessageSent", (e: MessageEvent) => {
        toast.success(e.message);
      });

      console.log("Successfully subscribed to channel:", channelName);
    }

    return () => {
      if (channel) {
        console.log("Stopping listening to MessageSent");

        channel.stopListening("MessageSent");
        channel.unsubscribe();
      }
    };
  }, [echo, user]);

  return user ? (
    <Link href="/account">
      <MainHeaderIcon icon={User} />
    </Link>
  ) : (
    <LoginFormSheet trigger={<MainHeaderIcon icon={User} />} />
  );
}
