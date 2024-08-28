"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { Loader } from "lucide-react";

interface FollowButtonProps {
  id: string;
}

export const FollowButton = ({ id }: FollowButtonProps) => {
  const isFollow = useQuery(api.followership.getFollowershipStatus, {
    followedId: id,
  });

  const { mutate, pending } = useApiMutation(
    api.followership.toggleFollowership
  );

  const onToggleFollowership: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    e.preventDefault();
    mutate({
      followedId: id,
    });
  };

  if (isFollow === undefined) {
    return (
      <button className="bg-transparent border border-black dark:border-white px-4 py-2 rounded text-sm animate-pulse">
        ...
      </button>
    );
  }

  return (
    <button
      onClick={onToggleFollowership}
      className={cn(
        "bg-transparent border border-black dark:border-white px-4 py-2  rounded text-sm",
        !isFollow && "bg-blue-800 border-none text-white",
        pending && "relative bg-blue-950"
      )}
    >
      {isFollow ? "Following" : "Follow"}
      {pending && <Loader className="absolute h-4 w-4 top-2 left-[50%]" />}
    </button>
  );
};
