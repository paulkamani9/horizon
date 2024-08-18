import { cn } from "@/lib/utils";
import Image from "next/image";
import { NewButton } from "../new-button";

interface EmptyStateProps {
  isUser: Boolean;
}

export const EmptyState = ({ isUser }: EmptyStateProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center mt-2">
      <div className="h-24 w-24 relative">
        <Image
          src="/no-document.svg"
          alt="no documents"
          fill
          objectFit="fill"
        />
      </div>
      <p className="text-sm opacity-80 mt-1">
        {isUser ? "You have no documents yet 😴" : "Did someone sweep here??🙄"}
      </p>
      <div className={cn("mt-4", !isUser && "hidden")}>
        <NewButton />
      </div>
    </div>
  );
};
