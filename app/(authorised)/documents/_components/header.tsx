"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useEditBar } from "@/store/use-edit-bar";
import { ChevronLeft } from "lucide-react";
import { AcceptOrReject } from "../../feed/invitations/_components/accept-or-reject";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  documentId: Id<"documents">;
  role: string;
  icon?: string;
  title: string;
}

export const Header = ({ documentId, role, icon, title }: HeaderProps) => {
  const { onClose, isOpen, onOpen } = useEditBar();

  return (
    <div className="w-full xl:w-[calc(100%-256px)] h-24 flex flex-col">
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center gap-1">
          <span className="text-xl">{icon}</span>
          <p className="truncate text-[18px]  lg:text-xl font-semibold">
            {title}
          </p>
        </div>
        <ChevronLeft
          onClick={() => {
            if (!isOpen) {
              onOpen();
            } else {
              onClose();
            }
          }}
          className={cn(
            "cursor-pointer transition-transform xl:hidden hover:-translate-x-1",
            isOpen && "rotate-180 hover:translate-x-1"
          )}
        />
      </div>
      {role === "invited" && (
        <div className="w-full flex flex-col items-center gap-1 mt-1">
          <p className="text-xs opacity-80">
            You have been invited to co-author this document
          </p>
          <AcceptOrReject documentId={documentId} />
        </div>
      )}
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="w-full xl:w-[calc(100%-256px)] h-24 flex flex-col">
      <Skeleton className="h-full w-2/3" />
    </div>
  );
};
