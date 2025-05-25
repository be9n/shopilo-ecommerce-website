import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SocialAuthButton({
  isAuthenticating,
  className,
  children,
  ...props
}: {
  isAuthenticating: boolean;
  className?: string;
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "w-full cursor-pointer rounded-full h-13 text-md relative",
        className
      )}
      {...props}
    >
      {isAuthenticating ? (
        <Loader2 className="mr-2 size-6 animate-spin translate-y-1/2 translate-x-1/2" />
      ) : (
        <>
          <FcGoogle className="size-9 absolute left-2 top-1/2 -translate-y-1/2" />
          {children}
        </>
      )}
    </Button>
  );
}
