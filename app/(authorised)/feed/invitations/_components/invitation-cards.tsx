"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { InvitationCard } from "./invitation-card";
import { EmptyState } from "../../_components/empty-state";

export const InvitationCards = () => {
  const invitations = useQuery(api.invitations.getAllMyInvitations);

  // todo: Add skeleton
  if (invitations === undefined) {
    return <div>Loading..</div>;
  }

  if (invitations.length < 1) {
    return (
      <EmptyState
        message="I made my decision. Period!"
        imageSrc="/invites-cleared.png"
      />
    );
  }

  return (
    <div className="flex flex-col w-full gap-8">
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
