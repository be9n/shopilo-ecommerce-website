import { XIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import LoginForm from "./LoginForm";

type LoginFormSheetProps = {
  trigger: React.ReactNode;
};

export default function LoginFormSheet({ trigger }: LoginFormSheetProps) {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="max-w-[300px]"
        withDefaultCloseButton={false}
      >
        <SheetHeader className="-mb-3">
          <div className="flex justify-between items-center pb-2">
            <SheetTitle className="text-xl font-medium">Log In</SheetTitle>
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
        <LoginForm />
      </SheetContent>
    </Sheet>
  );
}
