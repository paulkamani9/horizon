"use client";

import { useMutation, useQuery } from "convex/react";
import { EmptyState } from "./_components/empty-state";
import { api } from "@/convex/_generated/api";
import { NotificationsItem } from "./_components/notifications-item";
import { useEffect } from "react";

const FeedPage = () => {
  const clearGeneralNotifications = useMutation(
    api.notifications.clearNotifications
  );

  useEffect(() => {
    clearGeneralNotifications({
      page: "general",
    });
  }, []);
  
  const notifications = useQuery(api.notifications.getNotifications);
  if (notifications === undefined) {
    return <p>skeleton</p>;
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
        <NotificationsItem {...notification} />
      ))}
    </div>
  );
};
export default FeedPage;
