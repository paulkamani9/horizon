"use client";
import { Star, UserRoundCheck } from "lucide-react";
import { NewButton } from "../../_components/new-button";
import { useMobile } from "@/hooks/use-mobile";
import { HeaderWrapper } from "../../_components/header-wrapper";

export const Header = () => {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <HeaderWrapper>
        <div className="w-full h-full flex  items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold">My Documents</span>
            <UserRatings />
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
      <div className="w-full h-full flex flex-col">
        <UserRatings />
        <div>
          <span className="text-xl font-semibold">My Documents</span>
        </div>
      </div>
    </HeaderWrapper>
  );
};

const UserRatings = () => {
  return (
    <div className="flex gap-4 items-center justify-start ml-2 md:ml-0 md:justify-end">
      <div className="flex items-center justify-start gap-1">
        <Star className="fill-black/60 dark:fill-white/60 stroke-none h-4 w-4 xl:h-5 xl:w-5" />
        <span className="opacity-60 text-sm xl:text-base">10.9 m</span>
      </div>
      <div className="flex  items-center justify-start gap-1">
        <UserRoundCheck className="h-4 w-4 xl:h-5 xl:w-5" />
        <span className="opacity-60 text-sm xl:text-base">2.8 m</span>
      </div>
    </div>
  );
};
