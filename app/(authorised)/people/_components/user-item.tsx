"use client";

import Image from "next/image";
import Link from "next/link";
import { UserCounts } from "./user-counts";
import { Skeleton } from "@/components/ui/skeleton";
import { FollowAndMessage } from "../../_components/follow-and-message";
import { Copy } from "lucide-react";
import { HoverCardWrapper } from "../../_components/hover-card-wrapper";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UserItemProps {
  id: string;
  name: string;
  image: string;
  email: string;
}

export const UserItem = ({ id, name, image, email }: UserItemProps) => {


  const onCopyEmail: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard
      .writeText(email)
      .then(() => toast.success("Email copied."))
      .catch(() => toast.error("Failed to copy email."));
  };

  return (
    <Link href={`/people/${id}`} className="w-full">
      <div className="w-full flex rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className=" flex items-center justify-center p-6">
          <div className="relative aspect-square w-[60px]  rounded-[50%] lg:w-[90px]  overflow-clip">
            <Image src={image} alt={`${name} picture`} fill objectFit="fill" />
          </div>
        </div>
        <div className="flex-1 flex flex-col py-6">
          <p className="text-2xl font-semibold leading-none tracking-tight">
            {name}
          </p>
          <div className="flex flex-col mt-2 ml-2 gap-2">
            <div className="flex w-full items-center group gap-2">
              <p className="text-sm opacity-80 cursor-text truncate">{email}</p>
              <HoverCardWrapper message="Copy Email">
                <Button onClick={onCopyEmail} size="sm" variant={"ghost"}>
                  <Copy
                    size={20}
                    className="opacity-60 hover:opacity-80 hover:w-4 hover:h-4"
                  />
                </Button>
              </HoverCardWrapper>
            </div>
            <UserCounts id={id} />
          </div>
          <div className="mt-4">
            <FollowAndMessage id={id} email={email} name={name} />
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
