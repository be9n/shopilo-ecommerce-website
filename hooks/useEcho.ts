"use client";
import { useEffect, useState } from "react";

import Pusher from "pusher-js";
import Echo from "laravel-echo";
import api from "@/lib/api";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

const useEcho = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [echoInstance, setEchoInstance] = useState<any>(null);

  useEffect(() => {
    window.Pusher = Pusher;

    const echo = new Echo({
      broadcaster: "reverb",
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
      authorizer: (channel) => {
        return {
          authorize: (socketId, callback) => {
            api
              .post("/broadcasting/auth", {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => {
                callback(null, response.data);
              })
              .catch((error) => {
                callback(error, null);
              });
          },
        };
      },
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
      wsPort: process.env.NEXT_PUBLIC_REVERB_PORT
        ? parseInt(process.env.NEXT_PUBLIC_REVERB_PORT)
        : 80,
      wssPort: process.env.NEXT_PUBLIC_REVERB_PORT
        ? parseInt(process.env.NEXT_PUBLIC_REVERB_PORT)
        : 443,
      forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
      enabledTransports: ["ws", "wss"],
    });

    setEchoInstance(echo);
  }, []);

  return echoInstance;
};

export default useEcho;
