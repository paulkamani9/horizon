"use client";
import { NewButton } from "../../_components/new-button";
import { useMobile } from "@/hooks/use-mobile";
import { HeaderWrapper } from "../../_components/wrapper";
import { UserCounts } from "../../people/_components/user-counts";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const Header = () => {
  const isMobile = useMobile();
  const user = useQuery(api.users.getMyData);

  if (user === undefined) {
    return (
      <HeaderWrapper>
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="h-10 w-2/3 md:w-1/3" />
          </div>
          <div className="md:hidden inline-flex">
            <NewButton />
          </div>
        </div>
      </HeaderWrapper>
    );
  }

  if (isMobile) {
    return (
      <HeaderWrapper>
        <div className="w-full h-full flex  items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold">{user.name}</span>
            <UserCounts id={user.externalId} large={true} />
          </div>
          <div className="md:hidden inline-flex">
            <NewButton />
          </div>
        </div>
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper>
      <div className="w-full h-full flex flex-col gap-2 justify-center">
        <span className="text-2xl font-semibold">{user.name}</span>
        <UserCounts large={true} id={user.externalId} />
      </div>
    </HeaderWrapper>
  );
};
