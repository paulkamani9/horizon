import { cn } from "@/lib/utils";
import { MouseEventHandler, useState } from "react";

interface FollowButtonProps {
  isFollowing: boolean;
}

export const FollowButton = ({ isFollowing }: FollowButtonProps) => {
  const [follow, setFollow] = useState(isFollowing);
  const onClickFollowButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFollow(!follow);
  };
  return (
    <button
      onClick={onClickFollowButton}
      className={cn(
        "bg-transparent border border-black dark:border-white px-4 py-2  rounded text-sm",
        !follow && "bg-blue-800 border-none text-white"
      )}
    >
      {follow ? "Following" : "Follow"}
    </button>
  );
};
