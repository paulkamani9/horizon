"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Star, Users } from "lucide-react";

interface UserCountsProps {
  id: string;
  large?: boolean;
}
export const UserCounts = ({ id, large }: UserCountsProps) => {
  const followersCount = useQuery(api.followership.followersCount, {
    followedId: id,
  });
  const starCount = useQuery(api.stars.getUserStars, {
    id,
  });
  if (followersCount === undefined || starCount === undefined) {
    return (
      <div className="flex items-center gap-2 opacity-80">
        <div className="flex items-end gap-1">
          <Star size={16} /> <span className="text-xs">...</span>
        </div>
        <div className="flex items-end gap-1">
          <Users size={16} /> <span className="text-xs">...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 opacity-80">
      <div className="flex items-end gap-1">
        <Star className={cn("h-4 w-4", large && "h-5 w-5")} />
        <span className={cn("text-xs", large && "text-sm")}>{starCount}</span>
      </div>
      <div className="flex items-end gap-1">
        <Users className={cn("h-4 w-4", large && "h-5 w-5")} />
        <span className={cn("text-xs", large && "text-sm")}>
          {followersCount}
        </span>
      </div>
    </div>
  );
};
