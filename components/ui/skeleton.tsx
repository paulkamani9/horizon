import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md  bg-[--light-bg2] dark:bg-[--dark-bg2]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton }
