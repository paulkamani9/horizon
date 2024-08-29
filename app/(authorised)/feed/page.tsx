"use client";

import { useMutation, useQuery } from "convex/react";
import { EmptyState } from "./_components/empty-state";
import { api } from "@/convex/_generated/api";
import { NotificationsItem } from "./_components/notifications-item";
import { useEffect } from "react";
import { FeedPageSkeleton } from "./_components/feed-page-skeleton";

const FeedPage = () => {
  const clearGeneralNotifications = useMutation(
    api.notifications.clearNotifications
  );

  useEffect(() => {
    clearGeneralNotifications({
      page: "general",
    });
  }, [clearGeneralNotifications]);
  
  const notifications = useQuery(api.notifications.getNotifications);
  if (notifications === undefined) {
    return <FeedPageSkeleton />
  }

  if (notifications.length === 0) {
    return (
      <div className="w-full h-full">
        <EmptyState
          message="You are free of all burdens."
          imageSrc="/mindfullness.png"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-2">
      {notifications.map((notification) => (
        <NotificationsItem key={notification._id} {...notification} />
      ))}
    </div>
  );
};
export default FeedPage;
