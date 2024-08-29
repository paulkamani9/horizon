"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { InvitationCard, InvitationCardsSkeleton } from "./invitation-card";
import { EmptyState } from "../../_components/empty-state";
import { useEffect } from "react";

export const InvitationCards = () => {
  const clearInvitationsNotifications = useMutation(
    api.notifications.clearNotifications
  );

  useEffect(() => {
    clearInvitationsNotifications({
      page: "invitations",
    });
  }, [clearInvitationsNotifications]);

  const invitations = useQuery(api.invitations.getAllMyInvitations);

  if (invitations === undefined) {
    return (
      <div className="flex flex-col  items-center gap-8">
        <InvitationCardsSkeleton />
        <InvitationCardsSkeleton />
        <InvitationCardsSkeleton />
        <InvitationCardsSkeleton />
        <InvitationCardsSkeleton />
      </div>
    );
  }

  if (invitations.length < 1 || invitations == null ) {
    return (
      <EmptyState
        message="I made my decision. Period!"
        imageSrc="/invites-cleared.png"
      />
    );
  }

  return (
    <div className="flex flex-col w-full gap-8 items-center">
      {invitations.map((invitation) => (
        <InvitationCard
          key={invitation._id}
          documentId={invitation.documentId}
          ownerId={invitation.ownerId}
          message={invitation.message}
        />
      ))}
    </div>
  );
};
