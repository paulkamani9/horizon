"use client";

import { Handshake, House, Mail } from "lucide-react";
import { HeaderItem } from "./header-item";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const HeaderItems = () => {
  const newMessagesAndInvitationsCounts = useQuery(
    api.notifications.NewNotificationsStatus,
    {
      page: "both",
    }
  );

  const counts = {
    messagesCount: 0,
    invitationsCount: 0,
    ...(typeof newMessagesAndInvitationsCounts === "object"
      ? newMessagesAndInvitationsCounts
      : {}),
  };

  return (
    <div className="flex items-center gap-4">
      <HeaderItem link="/feed" Icon={House} />
      <HeaderItem
        link="/feed/messages"
        Icon={Mail}
        count={counts.messagesCount}
      />
      <HeaderItem
        link="/feed/invitations"
        Icon={Handshake}
        count={counts.invitationsCount}
      />
    </div>
  );
};
