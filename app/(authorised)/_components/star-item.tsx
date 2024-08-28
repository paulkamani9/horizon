"use client";

import { Id } from "@/convex/_generated/dataModel";
import { EyeOff, Star, StarOff } from "lucide-react";
import { HoverCardWrapper } from "./hover-card-wrapper";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import useSound from "use-sound";

interface StarItemProps {
  documentId: Id<"documents">;
  size?: "small" | "large";
  isPublic: boolean;
}

export const StarItem = ({ documentId, size, isPublic }: StarItemProps) => {
  const stars = useQuery(api.stars.getDocumentStars, {
    documentId,
  });
  const toggleStarDocument = useMutation(api.stars.toggleStarDocument);
  const [play] = useSound("/star-sound.wav");
  if (isPublic) {
    if (stars === undefined) {
      return (
        <div className="flex items-center gap-2">
          <Star
            className={cn(
              "hover:w-6 hover:h-6",
              size === "small" && "h-5 w-5",
              size === "large" && "hover:w-7 hover:h-7"
            )}
          />
          <span className="text-sm xl:text-sm opacity-80 animate-pulse">
            ...
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Star
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            play();
            toggleStarDocument({
              documentId,
            });
          }}
          role="button"
          className={cn(
            "hover:w-6 hover:h-6",
            stars?.isStar && "fill-yellow-500 stroke-none",
            size === "small" && "h-5 w-5",
            size === "large" && "hover:w-7 hover:h-7"
          )}
        />
        <span className="text-sm xl:text-sm opacity-80">
          {stars?.starCount}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <HoverCardWrapper message="This is a private document." side="right">
        <div className="flex items-center gap-2">
          {size === "large" ? (
            <StarOff className="opacity-60 h-5 w-5" />
          ) : (
            <EyeOff size={16} className="opacity-60" />
          )}

          {size === "large" && (
            <span className="text-sm xl:text-sm opacity-80">
              {stars?.starCount}
            </span>
          )}
        </div>
      </HoverCardWrapper>
    </div>
  );
};
