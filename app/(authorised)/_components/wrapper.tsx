import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  size?: "large" | "compact";
  className?: string;
}

export const PageWrapper = ({
  children,
  size,
  className: clsx,
}: WrapperProps) => {
  return (
    <div
      className={cn(
        "w-full mt-10 px-4 sm:px-2 lg:px-2 xl:px-4 2xl:px-20 max-h-[calc(100%-136px)]  overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600",
        size === "compact" && "mt-5 max-h-[calc(100%-60px)]",
        clsx && clsx
      )}
    >
      {children}
    </div>
  );
};

export const HeaderWrapper = ({
  children,
  size,
  className: clsx,
}: WrapperProps) => {
  return (
    <div
      className={cn(
        "h-24 w-full px-4 sm:px-6 md:px-10 lg:px-10 xl:px-16 2xl:px-20 ",
        size === "compact" && "h-10",
        clsx && clsx
      )}
    >
      {children}
    </div>
  );
};
