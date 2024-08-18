"use client";

import Image from "next/image";

import { FollowButton } from "../../_components/follow-button";
import { MessageButton } from "../../_components/message-button";
import Link from "next/link";
import { StarInformation } from "./star-information";
import { Skeleton } from "@/components/ui/skeleton";

interface UserItemProps {
  id: string;
  name: string;
  image: string;
}

export const UserItem = ({ id, name, image }: UserItemProps) => {
  return (
    <Link href={`/people/${id}`}>
      <div className="w-full px-2 flex py-6 gap-4 cursor-pointer bg-[--light-bg2] dark:bg-[--dark-bg2] rounded-sm  lg:pr-4 shadow-sm">
        <div className="relative w-[60px] h-20 rounded-md lg:w-[90px] lg:h-[120px] overflow-clip">
          <Image src={image} alt={`${name} picture`} fill objectFit="fill" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <p className="font-semibold text-xl">{name}</p>
          <div className=" w-full flex items-center justify-between mt-1">
            <StarInformation />
            <div className="hidden lg:flex gap-2">
              <FollowButton isFollowing={false} />
              <MessageButton />
            </div>
          </div>
          <div className="max-w-full overflow-hidden mt-2">
            <p className="truncate">
              <span className="text-sm opacity-80"> Best Known for: </span>
              <span className="underline text-sm cursor-pointer">
                How to sell your soul properly
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const UserItemSkeleton = () => {
  return (
    <div className="w-full h-20 rounded-sm">
      <Skeleton className="w-full h-full " />
    </div>
  );
};
