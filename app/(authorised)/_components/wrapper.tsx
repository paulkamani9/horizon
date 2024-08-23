import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  size?: "wide" | "compact";
}

export const PageWrapper = ({ children, size }: WrapperProps) => {
  return (
    <div
      className={cn(
        "w-full mt-10 max-h-[calc(100%-142px)] overflow-auto  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600",
        size === "compact" && "mt-5 max-h-[calc(100%-62px)] overflow-auto "
      )}
    >
      {children}
    </div>
  );
};

export const HeaderWrapper = ({ children, size }: WrapperProps) => {
  return (
    <div className={cn("h-24 w-full", size === "compact" && " h-10")}>
      {children}
    </div>
  );
};
