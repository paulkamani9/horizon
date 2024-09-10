import { cn } from "@/lib/utils";

export const Topper = () => {
  return (
    // mobile topper height = 8px
    <div
      className={cn("w-full bg-[--light-bg2] dark:bg-[--dark-bg2] h-2 lg:h-4")}
    />
  );
};
