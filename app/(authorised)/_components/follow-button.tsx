"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";

interface FollowButtonProps {
  id: string;
}

export const FollowButton = ({ id }: FollowButtonProps) => {
  const isFollow = useQuery(api.followership.getFollowershipStatus, {
    followedId: id,
  });

  const toggleFollowership = useMutation(api.followership.toggleFollowership);

  if (isFollow === undefined) {
    return (
      <button className="bg-transparent border border-black dark:border-white px-4 py-2 rounded text-sm animate-pulse">
        ...
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFollowership({
          followedId: id,
        });
      }}
      className={cn(
        "bg-transparent border border-black dark:border-white px-4 py-2  rounded text-sm",
        !isFollow && "bg-blue-800 border-none text-white"
      )}
    >
      {isFollow ? "Following" : "Follow"}
    </button>
  );
};
