"use client";

import { useQuery } from "convex/react";
import { MessageItem, MessagesSkeleton } from "./message-item";
import { api } from "@/convex/_generated/api";
import { EmptyState } from "../../_components/empty-state";

export const MessagesList = () => {
  const messages = useQuery(api.messages.getMyMessages);

  if (messages === null) {
    return (
      <div className="h-full w-full">
        <EmptyState
          message="I am the master of my inbox."
          imageSrc="/message-clear.png"
        />
      </div>
    );
  }

  if (messages === undefined) {
    return <div className="h-full w-full flex flex-col gap-8 max-w-xl">
      <MessagesSkeleton />
      <MessagesSkeleton />
      <MessagesSkeleton />
    </div>;
  }

  return (
    <div className="h-full w-full flex flex-col gap-8 max-w-xl">
      {messages.map((message) => (
        <MessageItem key={message._id} {...message} />
      ))}
    </div>
  );
};
