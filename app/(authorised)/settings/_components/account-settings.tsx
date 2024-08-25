"use client";

import { User2 } from "lucide-react";
import { SettingsItem } from "./settings-item";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useChangeNameModal } from "@/store/use-changeName-modal";
import { useChangeProfilePicture } from "@/store/use-change-profilePicture";

export const AccountSettings = () => {
  const user = useQuery(api.users.getMyData);
  const { onOpen } = useChangeNameModal();
  const changePP = useChangeProfilePicture();

  if (!user) {
    return (
      <SettingsItem header="Account" Icon={User2}>
        <div className="w-full flex items-center justify-between ">
          <p>Change name</p>
          <div className="w-20 h-8">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
        <div className="w-full flex items-center justify-between ">
          <p>Change profile picture</p>
          <div className="w-20 h-8">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </SettingsItem>
    );
  }
  return (
    <SettingsItem header="Account" Icon={User2}>
      <div
        role="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpen(user.name);
        }}
        className="w-full flex items-center justify-between hover:bg-[--light-bg2] dark:hover:bg-[--dark-bg2] px-2 py-2 rounded-lg cursor-pointer"
      >
        <p >Change Horizon name</p>
        <p className= " opacity-80">{user.name}</p>
      </div>

      <div
        role="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          changePP.onOpen(user.image);
        }}
        className="w-full flex items-center justify-between  hover:bg-[--light-bg2] dark:hover:bg-[--dark-bg2] px-2 py-2 rounded-lg cursor-pointer"
      >
        <p>Change Horizon profile picture</p>
        <div className="relative h-8 w-8 rounded-[50%] overflow-clip">
          <Image
            src={user.image}
            alt={user.name + "profile image" || "user profile image"}
            fill
            objectFit="cover"
          />
        </div>
      </div>
    </SettingsItem>
  );
};
