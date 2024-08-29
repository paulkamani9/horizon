"use client";

import { Eye, EyeOff } from "lucide-react";
import { StarItem } from "../../_components/star-item";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

interface StarButtonProps {
  documentId: Id<"documents">;
  authorId: string;
  isPublic: boolean;
  size?: "small" | "large";
}

export const StarButton = ({
  isPublic,
  documentId,
  authorId,
  size
}: StarButtonProps) => {
  const viewsCount = useQuery(api.views.getDocumentViewsCount, {
    documentId,
  });

  const viewDocument = useMutation(api.views.addDocumentUniqueViews);

  useEffect(() => {
    viewDocument({
      documentId,
      id: authorId,
    });
  }, [viewDocument,documentId,authorId]);

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center cursor-pointer gap-2 transition-transform">
        <StarItem documentId={documentId} isPublic={isPublic} size={size} />
      </div>
      <div className={cn("flex items-center gap-2 opacity-60 text-sm")}>
        {isPublic ? (
          <Eye className="h-5 w-5" />
        ) : (
          <EyeOff className="h-5 w-5" />
        )}
        <p>{viewsCount}</p>
      </div>
    </div>
  );
};
