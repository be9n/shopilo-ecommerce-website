import { XIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import LoginForm from "./LoginForm";
import { useState } from "react";

type LoginFormSheetProps = {
  trigger: React.ReactNode;
};

export default function LoginFormSheet({ trigger }: LoginFormSheetProps) {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="min-w-[340px] max-w-[340px] md:min-w-[450px] bg-white p-4"
        withDefaultCloseButton={false}
      >
        <SheetHeader>
          <div className="flex justify-between items-center pb-2">
            <SheetTitle className="text-xl font-medium">
              {isRegister ? "Create Account" : "Log In"}
            </SheetTitle>
            <SheetDescription>
              <SheetClose asChild>
                <XIcon
                  className="size-7 text-black cursor-pointer hover:text-primary transition-colors duration-300"
                  strokeWidth={2}
                />
              </SheetClose>
            </SheetDescription>
          </div>
          <Separator />
        </SheetHeader>
        <LoginForm isRegister={isRegister} setIsRegister={setIsRegister} />
      </SheetContent>
    </Sheet>
  );
}
