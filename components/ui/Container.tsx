import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-0 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
