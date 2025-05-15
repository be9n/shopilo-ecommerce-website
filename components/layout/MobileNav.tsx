import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import { XIcon } from "lucide-react";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="size-6 cursor-pointer hover:text-primary transition-all duration-300" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="max-w-[300px]"
        closeButton={
          <XIcon className="size-5 hover:text-primary transition-all duration-300 cursor-pointer" />
        }
      >
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
