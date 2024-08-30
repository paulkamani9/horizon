"use client";

import { HeaderWrapper } from "@/app/(authorised)/_components/wrapper";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import { UserCounts } from "../../_components/user-counts";
import { Skeleton } from "@/components/ui/skeleton";
import { FollowAndMessage } from "@/app/(authorised)/_components/follow-and-message";

interface HeaderProps {
  id: string;
}
const Header = ({ id }: HeaderProps) => {
  const user = useQuery(api.users.getAnotherUser, { externalId: id });
  if (user === undefined) {
    return <HeaderSkeleton />;
  }

  if (user === null) {
    return (
      <HeaderWrapper>
        <></>
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper>
      <div className="w-full h-full flex  gap-4">
        <div className="h-10 w-10 rounded-[50%] relative overflow-clip">
          <Image src={user.image} alt={user.name} objectFit="fill" fill />
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-xl font-semibold">{user.name}</p>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-3">
            <div className="pl-2 opacity-80">
              <UserCounts id={id} />
            </div>
            <FollowAndMessage id={id} email={user.email} name={user.name} />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
};
export default Header;

const HeaderSkeleton = () => {
  return (
    <HeaderWrapper>
      <div className="w-full h-full flex  gap-4">
        <div className="h-10 w-10 rounded-[50%] relative overflow-clip">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex-1 flex flex-col">
          <Skeleton className="h-10 w-full" />
          <div className="flex flex-col lg:flex-row lg:justify-between gap-3 h-full w-full">
            <div className="flex mt-1 gap-4">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-10" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
};
