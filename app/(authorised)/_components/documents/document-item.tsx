"use client";

import { File, MoreVertical } from "lucide-react";
import { DocumentStar } from "./document-star";
import { Actions } from "./actions";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface DocumentItemProps {
  documentId: Id<"documents">;
  title: string;
  icon?: string;
}

export const DocumentItem = ({
  title,
  documentId,
  icon,
}: DocumentItemProps) => {
  const { user } = useUser();
  const params = useParams();
  const id = params.id as string;

  return (
    <Link href={`/documents/${documentId}`}>
      <div className="w-full flex flex-col  relative items-center gap-2 hover:bg-[--light-bg2] hover:dark:bg-[--dark-bg2] px-1 py-2 group">
        <button
          className={cn(
            "absolute h-5 w-5 top-1 right-4 ",
            id && user?.id !== id && "hidden"
          )}
        >
          <Actions documentId={documentId} title={title}>
            <MoreVertical />
          </Actions>
        </button>
        <span className="absolute top-10">{icon}</span>
        <File className="h-20 w-20 dark:stroke-[#111827] dark:stroke-1 dark:fill-[#D1D5DB]" />
        <div className="max-w-full">
          <p className={"truncate text-center"}>{title}</p>
        </div>
        <DocumentStar />
      </div>
    </Link>
  );
};

export const DocumentItemSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center gap-2  px-1 py-2">
      <Skeleton className="h-20 w-20" />
      <div className="w-full">
        <Skeleton className="h-5 w-full" />
      </div>
      <Skeleton className="h-6 w-20" />
    </div>
  );
};
