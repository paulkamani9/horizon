"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatTimestamp } from "@/lib/date-formatter";
import { useMessageModal } from "@/store/use-message-modal";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

interface MessageItemProps {
  _id: Id<"messages">;
  title?: string | undefined;
  parentMessageId?: Id<"messages"> | undefined;
  senderId: string;
  receiverId: string;
  body: string;
  _creationTime: number;
}

export const MessageItem = ({
  _id,
  senderId,
  title,
  body,
  _creationTime,
  parentMessageId,
}: MessageItemProps) => {
  const sender = useQuery(api.users.getAnotherUser, { externalId: senderId });
  const date = formatTimestamp(_creationTime);
  const { onOpen } = useMessageModal();

  if (sender === null) {
    return <p>User not found</p>;
  }
  if (sender === undefined) {
    return <MessagesSkeleton />;
  }
  return (
    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex py-5">
        <div className="pl-4 pr-2 flex flex-col items-center">
          <Link href={`/people/${sender.externalId}`} className="flex">
            <div className="h-8 w-8 relative overflow-clip rounded-[50%]">
              <Image
                src={sender.image}
                alt={sender.name}
                fill
                objectFit="center"
              />
            </div>
          </Link>
        </div>
        <div className="flex-1 flex flex-col gap-4 px-4">
          <p>
            <Link
              href={`/people/${sender.externalId}`}
              className="font-semibold"
            >
              {sender.name}
            </Link>
            {!parentMessageId
              ? " sent you a message."
              : " replied to your message."}
          </p>
          {title && (
            <p className="text-center font-bold italic px-2">{title}</p>
          )}
          <div className="flex flex-col w-11/12 gap-4 items-end">
            <div className="w-full rounded-sm border  self-center text-sm px-2 py-4">
              {body}
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpen(
                  sender.externalId,
                  sender.email,
                  sender.name,
                  title,
                  _id
                );
              }}
              variant="outline"
              className="self-end"
            >
              Reply
            </Button>
          </div>
        </div>
      </div>
      <span className="text-xs opacity-80 px-4 pb-1">{date}</span>
    </div>
  );
};

export const MessagesSkeleton = () => {
  return (
    <div className="w-full rounded-lg overflow-clip">
      <Skeleton className="w-full h-40" />
    </div>
  );
};
