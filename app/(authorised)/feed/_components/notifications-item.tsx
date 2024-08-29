"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { FeedPageSkeleton } from "./feed-page-skeleton";
import { EmptyState } from "./empty-state";
import { UserCircle2 } from "lucide-react";

interface NotificationsItemProps {
  _id: Id<"notifications">;
  _creationTime: number;
  documentId?: string | undefined;
  type:
    | "following"
    | "starGazing"
    | "publicity"
    | "invitationAccept"
    | "invitationReject";
  notifierId: string;
  notifiedId: string;
  isSeen: boolean;
}

export const NotificationsItem = ({
  type,
  notifierId,
  documentId,
}: NotificationsItemProps) => {
  const user = useQuery(api.users.getAnotherUser, {
    externalId: notifierId,
  });

  const document = useQuery(api.documents.checkRoleAndReturnDocument, {
    documentId: documentId as Id<"documents">,
  });

  if (user === undefined) {
    return <FeedPageSkeleton />;
  }

  return (
    <Link href={`/people/${notifierId}`}>
      <div className="flex items-center gap-4 rounded-lg border bg-card text-card-foreground shadow-sm w-full px-4 py-6 ">
        <div className="w-6 h-6 rounded-[50%] relative overflow-clip">
          {user ? (
            <Image src={user.image} fill alt={user.name} />
          ) : (
            <UserCircle2 />
          )}
        </div>
        <div className="flex-1">
          <Link href={`/people/${notifierId}`}>
            <span className="underline font-semibold">
              {user ? user.name : "Unknown user"}
            </span>
          </Link>
          {type === "following" && <span> is now following you</span>}
          {type === "starGazing" && (
            <span>
              {" added a star to "}
              <span>
                {document?.role === "owner" ? " your document " : " "}
              </span>
              <Link href={`/documents/${documentId}`}>
                <span className="underline">{document?.title}</span>
              </Link>
            </span>
          )}
          .
          {type === "publicity" && (
            <span>
              {" made "}
              <Link href={`/documents/${documentId}`}>
                <span className="underline">{document?.title}</span>
              </Link>
              <span>{" public."}</span>
            </span>
          )}
          {type === "invitationAccept" && (
            <>
              <span className="text-green-600 dark:text-green-400 font-semibold">
                {" accepted your request to collaborate on "}
              </span>
              <Link href={`/documents/${documentId}`}>
                <span className="underline">{document?.title}</span>
              </Link>
            </>
          )}
          {type === "invitationReject" && (
            <>
              <span className="text-red-600 dark:text-red-400 font-semibold">
                {" declined your request to collaborate on "}
              </span>
              <Link href={`/documents/${documentId}`}>
                <span className="underline">{document?.title}</span>
              </Link>
            </>
          )}
          .
        </div>
      </div>
    </Link>
  );
};
