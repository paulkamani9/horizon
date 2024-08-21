"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";

import { XIcon } from "lucide-react";

interface TagItemProps {
  documentId: Id<"documents">;
  tagId: Id<"tags">;
  tag: string;
}

export const TagItem = ({ documentId, tag, tagId }: TagItemProps) => {
  const { mutate, pending } = useApiMutation(api.tags.deleteDocumentTags);
  return (
    <div
      className={cn(
        "flex py-1 px-2 items-center bg-[--light-bg2] text-wrap dark:bg-[--dark-bg2] gap-1 rounded-sm",
        pending && "opacity-60"
      )}
    >
      <p className=" text-xs">{tag}</p>
      <XIcon
        onClick={(e) => {
          e.preventDefault();
          mutate({
            documentId,
            tagId,
          });
        }}
        size={16}
        className="stroke-red-500 cursor-pointer"
      />
    </div>
  );
};

export const TagItemSkeleton = () => {
  return (
    <div className="flex py-1 px-2 w-full h-8 rounded-sm">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
